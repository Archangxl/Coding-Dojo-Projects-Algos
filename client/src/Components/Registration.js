import axios from 'axios';
import React ,{ useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
                console.log(res.data.user._id);
                navigate('/'+ res.data.user._id +'/dashboard')
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
        <div className="background-color">
            <nav className="fs-1 mt-3 d-flex justify-content-between">
                <h1>My Cookbook</h1>
                <Link className="fs-3" to='/'>Back</Link>
            </nav>
            <main className='mt-5'>
                <form onSubmit={onRegisterSubmittion}>
                    <h1>Register</h1>
                    <div className='row'> 
                        <p className='error'>{firstNameError}</p> 
                        <label className='col-3'>First Name: </label>
                        <input className='col-3' name='firstName' type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName}></input>
                    </div>
                    <div className='row'>
                        <p className='error'>{lastNameError}</p>
                        <label className='col-3'>Last Name: </label>
                        <input className='col-3' name='lastName' type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} ></input>
                    </div>
                    <div className='row'>
                        <p className='error'>{emailError}</p>
                        <label className='col-3'>Email: </label>
                        <input className='col-3' name='email' type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    </div>
                    <div className='row'>
                        <p className='error'>{passwordError}</p>
                        <label className='col-3'>Password: </label>
                        <input className='col-3' name="password" type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    </div>
                    
                    <div className='row'>
                        <p className='error'>{confirmPasswordError}</p>
                        <label className='col-3'>Confirm Password: </label>
                        <input className='col-3' name="confirmPassword" type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}></input>
                    </div>
                    <div className='mt-4'>
                        <button className='login-reg-btn btn'>Submit</button>
                    </div>
                </form>
            </main>
            </div>
        </>
    );
}
export default Registration;