import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DisplayPics from "./DisplayPics";
import UploadPhoto from "./Upload";
//import { getToPathname } from "@remix-run/router";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
    
    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json()
            setName(parseRes.user_email);
            //console.log(parseRes);
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("You logged out successfully!", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    useEffect(() => {
        getName();
    }, []);

    return (
        <Fragment>
            <h1>Main Dashboard {name}</h1>
            {/* <button className="btn btn-primary" onClick={e => SubmitEvent(e)}>Calculations</button> */}
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
            {/* <Link to="/billingcalculation">Input Electricity Billing Statements</Link> */}
            <Link to="/">Main Dashboard</Link>
            <Link to="/renters">Renters</Link>
            <Link to="/">Marketplace</Link>
            <Link to="/">Transactions</Link>
            <Link to="/billingstatement">Billing</Link>
            <Link to="/register">Create New Account</Link>
        </Fragment>
    );
};

export default Dashboard;