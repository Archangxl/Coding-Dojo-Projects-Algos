import axios from 'axios';
import React ,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState();

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState();

    const navigate = useNavigate();

    const onRegisterSubmittion = e => {
        e.preventDefault();
        axios 
            .post('http://localhost:8000/api/login', {email, password}, {withCredentials: true})
            .then(res => {
                setEmail("");
                setPassword("");
                console.log(res.data.user._id);
                navigate('/'+ res.data.user._id +'/dashboard')
            })
            .catch(err => {
                console.log(err);
                setEmailError((err.response.data.err === undefined) ? null : err.response.data.err.errors.email.message);
                setPasswordError((err.response.data.message === undefined) ? null : err.response.data.message);
            })
    }

    return (
        <>

            <nav>
                <h1>My Cookbook</h1>
            </nav>
            <main>
                <form onSubmit={onRegisterSubmittion}>
                    <h1>Log In</h1>
                    
                    <p>{emailError}</p>
                    <label>Email: </label>
                    <input name='email' type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    
                    <p>{passwordError}</p>
                    <label>Password: </label>
                    <input name="password" type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>

                    <button>Submit</button>
                </form>
            </main>
        </>
    );
}
export default Login;