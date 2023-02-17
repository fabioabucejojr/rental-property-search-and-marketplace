/* eslint-disable no-undef */
import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// import { BrowserRouter as Router } from "react-router-dom";

// billing
import Header from "../dashboard/billingStatement/Header";
import MainDetails from "../dashboard/billingStatement/MainDetails";
import ClientDetails from "../dashboard/billingStatement/ClientDetails";
import Dates from "../dashboard/billingStatement/Dates";
import Notes from "../dashboard/billingStatement/Notes";
import Tables from "../dashboard/billingStatement/Table";
import Footer from "../dashboard/billingStatement/Footer";
import BillingCalc from "./BillingCalc";


function BillOfStat() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = Boolean => {
    setIsAuthenticated(Boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token : localStorage.token }
      });
      console.log(response)
      const parseRes = await response.json()

      //console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    };
  };

  useEffect(() => {
    isAuth();
  });
    
    const [ShowBS, setShowBS] = useState(false)
    
    //billing statement info
    const [MainDetails, setMainDetails] = useState("");
    const [ClientDetails, setClientDetails] = useState("");
    const [Header, setHeader] = useState("");
    const [Table, setTable] = useState("");
    const [Notes, setNotes] = useState("");
    const [Footer, setFooter] = useState("");
    const [Dates, setDates] = useState("");
  
    //billing statement
    const [billing_id, setBillingId] = useState("");
    const [user_id, setUserId] = useState("");
    const [billing_type, setBillingType] = useState("");
    const [billing_type_id, setBillingTypeId] = useState("");
    const [description, setDescription] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLasttName] = useState("");
    const [meter_number, setMeterNumber] = useState("");
    const [serial_number, setSerialNumber] = useState("");
    const [prev_cutoff_date, setPrevCutoffDate] = useState("");
    const [curr_cutoff_date, setCurrCutoffDate] = useState("");
    const [total_amount_due, setTotalAmtDue] = useState("");
    const [total_consumption_perkwh, setTotalCons] = useState("");
    const [total_rate_perkwh, setTotalRate] = useState("");
    const [current_reading, setCurrentReading] = useState("");
    const [previous_reading, setPreviousReading] = useState("");
    const [monthly_consumption_perkwh, setMonthlyConsumption] = useState("");
    const [sub_total, setSubTotal] = useState("");
    const [addl_others, setAddlOthers] = useState("");
    const [total_monthly_due, setTotalMonthlyDue] = useState("");

    //footer
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebSite] = useState("");
  const [clientname, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  // const [notes, setNotes] = useState("");

    const handlePrint = () => {
        window.print()
    }

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/billingstatement", {
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
    

    
    return (
        <Fragment>
          <>
            <div className="container"></div>
          {ShowBS ?
            <div>
              <Header handlePrint={handlePrint} />
              <MainDetails name={first_name} address={address} />
              <ClientDetails />
              <Dates />
              <Tables />
              <Notes />
              <Footer fname={first_name} lname={last_name} address={address} website={website} email={email} />
              <button onClick={(e) => setShowBS(false)} className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded  shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit Information</button>
            </div> :
            (
              <div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="first_name">Enter your First Name:</label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    placeholder="Enter your name"
                    autoComplete="off"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="last_name">Enter your Last Name:</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Enter your last name"
                    autoComplete="off"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="address">Enter your Address:</label>
                  <input
                    type="address"
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="email">Enter your Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col justify-center">
                  <label htmlFor="website">Enter your website:</label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    placeholder="Enter your website"
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebSite(e.target.value)} />
                </div>
                
                <button onClick={(e) => setShowBS(true)} className="bg-blue-500 text-white font-bold py-2 px-8 rounded  shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview Billing Statement</button>
                
              </div>
            )}
          </>
          
        </Fragment>
)};

export default BillOfStat;