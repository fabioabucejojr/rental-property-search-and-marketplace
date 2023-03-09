import {useState} from "react";
import "./Home.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";


export default function SiteContact() {
    const [inputs, setInputs] = useState("");

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const value = Object.fromEntries(data.entries());
        console.log(value);
    }
    return (
        <div>
            <section className="navbar--header">
                <Navbar />
            </section>
            <section className="hero--contact">        
                <div className="hero--contact--container">
                    <h1>Contact Us:</h1>
                    <h3>Let us simplify your search. <br/>...and Discover the benefits of renting.<br/><br/> ...We're just a Message Away.</h3><br/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="contact--name">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={handleChange}
                            />
                            <label htmlFor="contact--email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={handleChange}
                            />
                            <label htmlFor="contact--msg">Message:</label>
                            <input
                                type="textarea"
                                className="form-control"
                                id="message"
                                name="message"
                                onChange={handleChange}
                            />
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

