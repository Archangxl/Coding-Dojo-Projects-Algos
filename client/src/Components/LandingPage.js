import { Link } from "react-router-dom";
import React from 'react';

const LandingPage = () => {
    return (
        <>
            <div className="background-color">
                <nav>
                    <h1>My Cookbook</h1>
                </nav>
                <header>
                    <Link className="fs-3" to='/login'>Login</Link>
                    <Link className="fs-3" to='/register'>Register</Link>
                </header>
                <main className="my-5">
                    <div className="d-flex justify-content-center">
                        <h4>Planned additions</h4>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <ul className="col-10"> 
                            <li>Pictures for recipes</li>
                            <li>Shared recipes page: when landing on the websites landing page anyone who wants to share recipes will have their recipes they want to share shown on the landing page</li>
                            <li>Edit user page</li>
                        </ul>
                        <div className="col-1"></div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default LandingPage;