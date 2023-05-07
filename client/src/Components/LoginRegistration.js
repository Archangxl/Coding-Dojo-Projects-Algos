import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegistration = () => {
    const [registerLoaded, setRegisterLoaded] = useState(false);
    // Register process, login process below "//End of register Process"
    const [registeringUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [registerErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        hasTheFormBeenSubmitted: 
    })

    const onRegisterSubmittion = async(e) => {
        e.preventDefault();
        try {
            const registering = await axios.post('http://localhost:8000/api/registerUser', registeringUser);
            console.log(registering.data);

            registeringUser.firstName = "";
            registeringUser.lastName = "";
            registeringUser.email = "";
            registeringUser.password = "";
            registeringUser.confirmPassword = "";

            registerErrors.firstNameError = "";
            registerErrors.lastNameError = "";
            registerErrors.emailError = "";
            registerErrors.passwordError = "";
            registerErrors.confirmPasswordError = "";
            
        } catch(err) {
            let errResponse = err.response.data;

            if (errResponse.err.errors.firstName === undefined) {
                registerErrors.firstNameError = undefined;
            } else {
                registerErrors.firstNameError = errResponse.err.errors.firstName.message;
            }
            if (errResponse.err.errors.lastName === undefined) {
                registerErrors.lastNameError = undefined;
            } else {
                registerErrors.lastNameError = errResponse.err.errors.lastName.message;
            }
            if (errResponse.err.errors.email === undefined) {
                registerErrors.emailError = undefined;
            } else {
                registerErrors.emailError = errResponse.err.errors.email.message;
            }
            if (errResponse.err.errors.password === undefined) {
                registerErrors.passwordError = undefined;
            } else {
                registerErrors.passwordError = errResponse.err.errors.password.message;
            }
            if (registeringUser.confirmPassword === registeringUser.password) {
                registerErrors.confirmPasswordError = undefined;
            } else {
                registerErrors.confirmPasswordError = "Passwords need to Match!";
            }

            console.log(registerErrors);
        }
    }
    //End of register Process
    //login Process
    const [loggingInUser] = useState({
        email: "",
        password: ""
    })
    const [loggingInErrors] = useState({
        emailError: "",
        passwordError: ""
    })

    const onLoggingSubmittion = async(e) => {
        e.preventDefault();
        try {
            const findingUser = await axios.post('http://localhost:8000/api/login', loggingInUser);
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
                { registeringErrors}
                <form onSubmit={onRegisterSubmittion}>
                    <h1>Register</h1>
                    {registerErrors.firstNameError === undefined ? null : <p>{registerErrors.firstNameError}</p>}
                    <label>First Name: </label>
                    <input onChange={(e) => registeringUser.firstName = (e.target.value)}></input>
                    {registerErrors.lastNameError}
                    <label>Last Name: </label>
                    <input onChange={(e) => registeringUser.lastName = (e.target.value)}></input>
                    {registerErrors.emailError}
                    <label>Email: </label>
                    <input onChange={(e) => registeringUser.email = (e.target.value)}></input>
                    {registerErrors.passwordError}
                    <label>Password: </label>
                    <input onChange={(e) => registeringUser.password = (e.target.value)}></input>
                    {registerErrors.confirmPasswordError}
                    <label>Confirm Password: </label>
                    <input onChange={(e) => registeringUser.confirmPassword = (e.target.value)}></input>

                    <button>Submit</button>
                </form>

                <form onSubmit={onLoggingSubmittion}>
                    <h1>Log In</h1>
                    <label>Email: </label>
                    <input onChange={(e) => loggingInUser.email = (e.target.value)}></input>

                    <label>Password: </label>
                    <input onChange={(e) => loggingInUser.password = (e.target.value)}></input>

                    <button>Submit</button>
                </form>
            </main>
        </>
    );
}
export default LoginRegistration;