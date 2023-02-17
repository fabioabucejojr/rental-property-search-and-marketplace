import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { getData } from "./api/axios";
import SearchBar from "./components/SearchBar";
import { Switch } from "react-router-dom";
// import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ReactDOM from 'react-dom';
import {createRoot} from "react-dom";
import Footer from "./components/Footer";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

//components
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import MarketplacePage from "./components/Marketplace";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UsrDashboard";

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
      // console.log(parseRes);
    } catch (err) {
      console.log(err.message);
    };
  };

  useEffect(() => {
    isAuth();
  }, []);


    // console.log(container.nodeType);
    // console.log(container instanceof HTMLElement);

    // //
    // const handlePrint = () => {
    //   window.print()
    // }
    // class App extends React.Component {
    //   render() {
  
// function defineUser() {
//   const user = defineUser(); // get user from authentication service
//   return (
//     <div className="App">
//       <Switch>
//         <Route path="/user" component={UserDashboard} />
//         <Route path="/admin" component={AdminDashboard} />
//         <Navigate to={user.user_type === 'user' ? '/user' : '/admin'} />
//       </Switch>
//     </div>
//   );
// }

    return (
      <Fragment>
        <Router>
          <Navbar />
          {/* <searchBar data={data} setSearchResults={setSearchResults} />
          <Switch>        
            
            <Navigate to={users.user_type === 'user' ? '/user' : '/admin'} />        
          </Switch> */}
            <Routes>
              {/* <Route path="/user" component={UserDashboard} />
              <Route path="/admin" component={Dashboard} /> */}
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
        <Footer />
      </Fragment>
    );
  };

export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);