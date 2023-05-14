import { Link } from "react-router-dom";
import React from 'react';

const LandingPage = () => {
    return (
        <>
            <nav className="fs-1 my-5 d-flex justify-content-center">
                <h1>My Cookbook</h1>
            </nav>
            <header className="d-flex justify-content-evenly">
                <Link className="fs-3" to='/login'>Login</Link>
                <Link className="fs-3" to='/register'>Register</Link>
            </header>
        </>
    );
}

export default LandingPage;