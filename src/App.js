import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
// import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Typography } from "@mui/material";
import axios from "axios";
import ReactDOM from 'react-dom';
import {createRoot} from "react-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

//components
import Home from "./pages/Home";
import Search from "./components/Marketplace";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import BillingCalc from "./components/BillingCalc";
import BillOfStat from "./components/BS";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children;
  }
};

async function logErrorToMyService(error, errorInfo) {
  axios.post("/errors", { error, errorInfo })
    .then(response => {
      console.log("Error reported to service:", response.data);
    })
    .catch(error => {
      console.log("Error reporting failed:", error);
    })
};


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = Boolean => {
    setIsAuthenticated(Boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      console.log(response)
      const parseRes = await response.json()

      // console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    };
  };

  useEffect(() => {
    isAuth();
  }, []);


  ReactDOM.render(<ErrorBoundary>
    <App />
  </ErrorBoundary>, document.getElementById("root"));





    // const root = document.getElementById("root");
    // render(
    //   <ErrorBoundary>
    //     <App />
    //   </ErrorBoundary>,
    //   root
    // );


    // console.log(container.nodeType);
    // console.log(container instanceof HTMLElement);

    // //
    // const handlePrint = () => {
    //   window.print()
    // }
    // class App extends React.Component {
    //   render() {

    return (
      <Fragment>
        <Router>
          <Navbar />


          <Routes>

            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/getstarted" element={<GetStarted />} />
            <Route exact path="/contact" element={<Contact />} />
            {/* <Route exact path="/footer" element={<Footer />} /> */}
            <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} />
            {/* <Route exact path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} /> */}
            {/* <Route exact path="/dashboard" element={!isAuthenticated ? (<Dashboard setAuth={setAuth} />) : (<Navigate to="/login" />)} /> */}
            {/* <Route exact path="/billingstatement" element={isAuthenticated ? (<BillOfStat setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} />
                <Route exact path="/billingstatement" element={!isAuthenticated ? (<BillOfStat setAuth={setAuth} />) : (<Navigate to="/login" />)} />
                <Route exact path="/billingcalculation" element={isAuthenticated ? (<BillingCalc setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} />
                <Route exact path="/billingcalculation" element={!isAuthenticated ? (<BillingCalc setAuth={setAuth} />) : (<Navigate to="/login" />)} /> */}
            {/* <Route exact path="/billingstatement" element={!isAuthenticated ? (<BS setAuth={setAuth} />) : (<Navigate to="/login" />)} />
                <Route exact path="/billingstatement" element={isAuthenticated ? (<BS setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} /> */}
            {/* <Route exact path="/billingcalculation" element={<BillingCalc />} /> */}
          </Routes>
        </Router>
      </Fragment>
    );
  };

export default App;

// useEffect(() => {
//   isAuth();
//   }, []);

const root = createRoot(document.getElementById('root'));
root.render(<App />);