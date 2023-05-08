import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegistration = () => {
    // Register process, login process below "//End of register Process"
    const [firstName, setFirstName] = useState();
    const [firstNameError, setFirstNameError] = useState();
    const [lastName, setLastName] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();

    const navigate = useNavigate();

    const onRegisterSubmittion = async(e) => {
        e.preventDefault();
        try {
            const registering = await axios.post('http://localhost:8000/api/registerUser', 
            {firstName: firstName, lastName: lastName, email: email, password: password, confirmPassword: confirmPassword} );
            setFirstName();
            setLastName();
            setEmail();
            setPassword();
            setConfirmPassword();

            console.log(registering);
            navigate('/')
            
        } catch(err) {
            console.log(err);
        }
    }
    //End of register Process
    //login Process

    const onLoggingSubmittion = async(e) => {
        e.preventDefault();
        try {
            const findingUser = await axios.post('http://localhost:8000/api/login', {email: email, password: password});
        } catch(err) {
            let searchingErrors = {emError: "", pasError: ""};
            let errResponse = err.response.data;
            console.log(err);
        }

    }

    return (
        <>
            <nav>
                <h1>My Cookbook</h1>
            </nav>
            <main>
                
                <form onSubmit={onRegisterSubmittion}>
                    <h1>Register</h1>
                    
                    <label>First Name: </label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    
                    <label>Last Name: </label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    
                    <label>Email: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    
                    <label>Password: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    
                    <label>Confirm Password: </label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>

                    <button>Submit</button>
                </form>

                <form onSubmit={onLoggingSubmittion}>
                    <h1>Log In</h1>
                    <label>Email: </label>
                    <input onChange={(e) => setEmail(e.target.value)}></input>
                    
                    <label>Password: </label>
                    <input onChange={(e) => setPassword(e.target.value)}></input>

                    <button>Submit</button>
                </form>
            </main>
        </>
    );
}
export default LoginRegistration;