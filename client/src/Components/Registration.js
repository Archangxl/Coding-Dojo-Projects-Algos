import axios from 'axios';
import React ,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState();

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState();

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState();

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState();

    const navigate = useNavigate();

    const onRegisterSubmittion = e => {
        e.preventDefault();
        axios 
            .post('http://localhost:8000/api/registerUser', {firstName, lastName, email, password, confirmPassword}, {withCredentials: true})
            .then(res => {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
                if (err.response.data.err === undefined) {
                    setEmailError(err.response.data.message);
                } else {
                    setFirstNameError((err.response.data.err.errors.firstName === undefined) ? null : err.response.data.err.errors.firstName.message);
                    setLastNameError((err.response.data.err.errors.lastName === undefined) ? null : err.response.data.err.errors.lastName.message);
                    setEmailError((err.response.data.err.errors.email === undefined) ? null : err.response.data.err.errors.email.message);
                    setPasswordError((err.response.data.err.errors.password === undefined) ? null : err.response.data.err.errors.password.message);
                    setConfirmPasswordError((err.response.data.err.errors.confirmPassword === undefined) ? null : err.response.data.err.errors.confirmPassword.message);
                }
            })
    }

    return (
        <>
            <nav>
                <h1>My Cookbook</h1>
            </nav>
            <main>
                <form onSubmit={onRegisterSubmittion}>
                    <h1>Register</h1>
                    
                    <p>{firstNameError}</p>
                    <label>First Name: </label>
                    <input name='firstName' type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName}></input>
                    
                    <p>{lastNameError}</p>
                    <label>Last Name: </label>
                    <input name='lastName' type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} ></input>
                    
                    <p>{emailError}</p>
                    <label>Email: </label>
                    <input name='email' type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    
                    <p>{passwordError}</p>
                    <label>Password: </label>
                    <input name="password" type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>

                    <p>{confirmPasswordError}</p>
                    <label>Confirm Password: </label>
                    <input name="confirmPassword" type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}></input>

                    <button>Submit</button>
                </form>
            </main>
        </>
    );
}
export default Registration;