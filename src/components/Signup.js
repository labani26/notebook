import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credential, setCredential] = useState({ username: "", email: "", password: "", conpassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = credential;
        try {
            const response = await fetch("http://localhost:5000/auth/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const json = await response.json();
            console.log(json);

            if (json.success) {
                navigate('/');
                props.showAlert("Account created", "success");
            } else {
                props.showAlert("Invalid details", "danger");
            }
        } catch (error) {
            console.error('Error during signup:', error);
            props.showAlert("Something went wrong", "danger");
        }
    };

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <div className='container mt-3'>
            <h2 className='my-3'>Create an account to continue to Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        name="username" 
                        value={credential.username} 
                        onChange={onChange} 
                        aria-describedby="emailHelp" 
                        required 
                    />
                </div>
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
                        minLength={5} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="conpassword" className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="conpassword" 
                        name="conpassword" 
                        value={credential.conpassword} 
                        onChange={onChange} 
                        minLength={5} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Signup;
