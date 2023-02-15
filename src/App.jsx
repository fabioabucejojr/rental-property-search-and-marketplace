import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { getData } from "./api/axios";
import searchBar from "./components/SearchBar";
// import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
import About from "./pages/About";
// import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import MarketplacePage from "./components/Marketplace";
import Dashboard from "./components/Dashboard";
import UserDashboard from "../src/dashboard/UsrDashboard";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     logErrorToMyService(error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>
//     }

//     return this.props.children;
//   }
// };

// async function logErrorToMyService(error, errorInfo) {
//   axios.post("/errors", { error, errorInfo })
//     .then(response => {console.log("Error reported to service:", response.data);
//     })
//     .catch (err => {
//       console.error(err.message);
//     }, []);
// }


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getData().then(json => {
      setData(json)
      return json
    }).then(json => {
      setSearchResults(json)
    })
  }, []);

  const setAuth = Boolean => {
    setIsAuthenticated(Boolean);
  };

  // router.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  async function isAuth() {

    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      //console.log(response)
      const parseRes = await response.json()


      parseRes === false ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(parseRes);
    } catch (err) {
      console.log(err.message);
    };
  };

  useEffect(() => {
    isAuth();
  }, []);

  // ReactDOM.render(<ErrorBoundary>
  //   <App />
  // </ErrorBoundary>, document.getElementById("root"));

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
          <searchBar data={data} setSearchResults={setSearchResults} />

            <Routes>

              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Home />} />
              <Route exact path="/marketplace" element={<MarketplacePage />} />
              <Route exact path="/about" element={<About />} />
              {/* <Route exact path="/getstarted" element={<GetStarted />} /> */}
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} />
              <Route exact path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} />
              <Route exact path="/dashboard" element={!isAuthenticated ? (<Dashboard setAuth={setAuth} />) : (<Navigate to="/login" />)} />
            </Routes>

        </Router>
      </Fragment>
    );
  };

export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);