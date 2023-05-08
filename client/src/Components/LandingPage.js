import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <nav>
                <h1>My Cookbook</h1>
            </nav>
            <header>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </header>
        </>
    );
}

export default LandingPage;