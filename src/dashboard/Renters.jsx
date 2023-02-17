import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



const Renters = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        
        user_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        bdate: "",
        user_email: "",
        user_type: ""
        
    });

    const { 
        user_id,
        first_name,
        middle_name,
        last_name,
        bdate,
        user_email,
        user_password,
        user_type } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
            const body = {
                user_id,
                first_name,
                middle_name,
                last_name,
                bdate,
                user_email,
                user_password,
                user_type
            }
            
            console.log(body)
            const response = await fetch("http://localhost:5000/dashboard/renters", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                console.log(parseRes);
                setAuth(true);
                toast.success("Renters Updated Successfully!", {
                    position: toast.POSITION.TOP_CENTER});
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

            // console.log(parseRes)          

        } catch (err) {
            console.log(err.message)
        };
    };

    let dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const newdate = year + "-" + month + "-" + day;

    <select name="user_type" id="user_type">
        <option value="">user</option>
        <option value="">staff</option>
        <option value="">admin</option>
    </select>
    

    return (
        <Fragment>
            <h1 className="text-center my-5">Renters Information</h1>
            <form onSubmit={onSubmitForm}>


                <input
                    type="number"
                    name="user_id"
                    placeholder="user_id"
                    className="form-control my-3"
                    value={user_id}
                    readOnly
                    onChange={e => onChange(e)} />
                <input
                    type="text"
                    name="first_name"
                    placeholder="first_name"
                    className="form-control my-3"
                    value={first_name}
                    readOnly
                    onChange={e => onChange(e)} />
                <input
                    type="text"
                    name="middle_name"
                    placeholder="middle_name"
                    className="form-control my-3"
                    value={middle_name}

                    onChange={e => onChange(e)} />
                <input
                    type="text"
                    name="last_name"
                    placeholder="last_name"
                    className="form-control my-3"
                    value={last_name}
                    onChange={e => onChange(e)} />
                <input
                    type="date"
                    name="bdate"
                    placeholder="bdate"
                    className="form-control my-3"
                    value={bdate}
                    onChange={e => onChange(e)} />
                <input
                    type="email"
                    name="user_email"
                    placeholder="user_email"
                    className="form-control my-3"
                    value={user_email}
                    onChange={e => onChange(e)} />
                <input
                    type="text"
                    name="user_type"
                    placeholder="user_type"
                    className="form-control my-3"
                    value={user_type}
                    onChange={e => onChange(e)} />
                
                <button className="btn bt-success btn-block">Submit</button>
            </form>
            <Link to="/dashboard">Dashboard</Link>
        </Fragment>
    );
};

export default Renters;