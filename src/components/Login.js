import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credential.email, password: credential.password }) // Send email and password in the request body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const json = await response.json();
            console.log(json);

            if (json.success) {
                // save the auth token and redirect
                navigate('/');
                props.showAlert("Logged in successfully", "success");
            } else {
                props.showAlert("Invalid credentials", "danger");
            }
        } catch (error) {
            console.error('Error during login:', error);
            props.showAlert("Something went wrong", "danger");
        }
    };

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });  // Update state with the new value
    };

    return (
        <div className='mt-3'>
            <h2>Login to continue to Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"  
                        value={credential.email} 
                        onChange={onChange} 
                        aria-describedby="emailHelp" 
                        required 
                    />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={credential.password} 
                        onChange={onChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
