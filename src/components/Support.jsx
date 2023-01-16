import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



const BillingCalc = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        billing_id: "",
        user_id: "",
        billing_type: "",
        description: "",
        billing_type_id: "",
        meter_number: "",
        serial_number: "",
        prev_cutoff_date: "",
        curr_cutoff_date: "",
        total_amount_due: "",
        total_consumption_perkwh: "",
        total_rate_perkwh: "",
        current_reading: "",
        previous_reading: "",
        monthly_consumption_perkwh: "",
        sub_total: "",
        other_charges: "",
        total_monthly_due: ""
    });

    const { 
        billing_id,
        user_id,
        billing_type,
        description,
        billing_type_id,
        meter_number,
        serial_number,
    prev_cutoff_date,
    curr_cutoff_date,
    total_amount_due,
    total_consumption_perkwh,
    total_rate_perkwh,
    current_reading,
    previous_reading,
    monthly_consumption_perkwh,
    sub_total,
    other_charges,
    total_monthly_due } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
            const body = {
            billing_id,
            user_id,
            billing_type,
            description,
            billing_type_id,
            meter_number,
            serial_number,
            prev_cutoff_date,
            curr_cutoff_date,
            total_amount_due,
            total_consumption_perkwh,
            total_rate_perkwh,
            current_reading,
            previous_reading,
            monthly_consumption_perkwh,
            sub_total,
            other_charges,
            total_monthly_due,
            }
            
            console.log(body)
            const response = await fetch("http://localhost:5000/dashboard/billingstatement", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                console.log(parseRes);
                setAuth(true);
                toast.success("Billing Statement Updated Successfully!", {
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
            <h1 className="text-center my-5">Billing Statement</h1>
            <form onSubmit={onSubmitForm}>


                <input
                    type="number"
                    name="billing_id"
                    placeholder="billing_id"
                    className="form-control my-3"
                    value={billing_id}
                    readOnly
                    onChange={e => onChange(e)} />
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
                    name="billing_type"
                    placeholder="billing_type"
                    className="form-control my-3"
                    value={billing_type}

                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="billing_type_id"
                    placeholder="billing_type_id"
                    className="form-control my-3"
                    value={billing_type_id}
                    onChange={e => onChange(e)} />
                <input
                    type="text"
                    name="description"
                    placeholder="description"
                    className="form-control my-3"
                    value={description}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="meter_number"
                    placeholder="meter_number"
                    className="form-control my-3"
                    value={meter_number}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="serial_number"
                    placeholder="serial_number"
                    className="form-control my-3"
                    value={serial_number}
                    onChange={e => onChange(e)} />
                <input
                    type="date"
                    name="previous_cutoff_date"
                    placeholder="prev_cutoff_date"
                    className="form-control my-3"
                    value={prev_cutoff_date} min="1900-01-01" max={newdate}
                    onChange={e => onChange(e)} />
                <input
                    type="date"
                    name="current_cutoff_date"
                    placeholder="curr_cutoff_date"
                    className="form-control my-3"
                    value={curr_cutoff_date} min="1900-01-01" max={newdate}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="total_amount_due"
                    placeholder="total_amount_due"
                    className="form-control my-3"
                    value={total_amount_due}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="total_consumption"
                    placeholder="total_consumption_perkwh"
                    className="form-control my-3"
                    value={total_consumption_perkwh}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="total_rate"
                    placeholder="total_rate_perkwh"
                    className="form-control my-3"
                    value={total_rate_perkwh}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="current_reading"
                    placeholder="current_reading"
                    className="form-control my-3"
                    value={current_reading}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="previous_reading"
                    placeholder="previous_reading"
                    className="form-control my-3"
                    value={previous_reading}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="monthly_consumption"
                    placeholder="monthly_consumption_perkwh"
                    className="form-control my-3"
                    value={monthly_consumption_perkwh}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="subtotal"
                    placeholder="sub_total"
                    className="form-control my-3"
                    value={sub_total}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="other_charges"
                    placeholder="other_charges"
                    className="form-control my-3"
                    value={other_charges}
                    onChange={e => onChange(e)} />
                <input
                    type="number"
                    name="total_monthly_due"
                    placeholder="total_monthly_due"
                    className="form-control my-3"
                    value={total_monthly_due}
                    onChange={e => onChange(e)} />
                
                <button className="btn bt-success btn-block">Submit</button>
            </form>
            <Link to="/dashboard">Dashboard</Link>
        </Fragment>
    );
};

export default BillingCalc;