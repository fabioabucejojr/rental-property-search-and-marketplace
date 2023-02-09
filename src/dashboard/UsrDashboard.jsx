import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DisplayPics from "../components/DisplayPics";
import UploadPhoto from "../components/Upload";
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
            <h1>User Dashboard {name}</h1>
            {/* <button className="btn btn-primary" onClick={e => SubmitEvent(e)}>Calculations</button> */}
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
            {/* <Link to="/billingcalculation">Input Electricity Billing Statements</Link> */}
            <Link to="/">User Profile</Link>
            <Link to="/propertylist">Create New Property Listing</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/billingstatement">Billing</Link>
        </Fragment>
    );
};

export default Dashboard;