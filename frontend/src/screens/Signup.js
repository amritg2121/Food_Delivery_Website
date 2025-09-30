import React, { useState, useEffect, useRef } from 'react';
import {Link, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
  
export default function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const signupModalRef = useRef(null);

    useEffect(() => {
        if (signupModalRef.current) {
            signupModalRef.current.classList.add("show");
            signupModalRef.current.style.display = "block";
            document.body.classList.add("modal-open");
        }
    }, []);

    const closeSignupModal = () => {
        if (signupModalRef.current) {
            signupModalRef.current.classList.remove("show");
            signupModalRef.current.style.display = "none";
            document.body.classList.remove("modal-open");
        }
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    const response = await fetch(`${API_URL}/api/creatuser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json();

        if (!json.success) {
            alert("Enter Valid Credentials");
        } else {
            closeSignupModal(); // Close signup modal
            setShowSuccessModal(true); // Show success modal
        }
    };

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    };



    return (
        <div className='container'>
            {/* Signup Modal (opens automatically) */}
            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true" ref={signupModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">                        
                            <h5 className="modal-title" id="signupModalLabel">Signup</h5>
                            <button type="button" className="btn-close" onClick={closeSignupModal}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="geolocation" className="form-label">Address</label>
                                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} required />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                                <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Signup Successful!</h5>
                            </div>
                            <div className="modal-body">
                                <p>Your account has been created successfully.</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => navigate("/login")}>Go to Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
