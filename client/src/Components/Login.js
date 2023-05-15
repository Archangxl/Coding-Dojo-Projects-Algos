import axios from 'axios';
import React ,{ useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

            <nav className="fs-1 mt-3 d-flex justify-content-between">
                <h1>My Cookbook</h1>
                <Link className="fs-3" to='/'>Back</Link>
            </nav>
            <main className='mt-5'>
                <form onSubmit={onRegisterSubmittion}>
                    <h1>Log In</h1>
                    
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
                    <div className='mt-4'>
                        <button className='login-reg-btn btn border-dark'>Submit</button>
                    </div>
                </form>
            </main>
        </>
    );
}
export default Login;