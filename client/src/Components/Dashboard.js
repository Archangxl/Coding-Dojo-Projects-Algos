import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [userIdCookies, setUserIdCookies] = useState("");
    const navigate = useNavigate();

    const logout = (e) => {
        axios
            .get('http://localhost:8000/api/logout')
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            {console.log(userIdCookies)}
            <nav>
                <h1>My Cookbook</h1>
                <button onClick={logout}>Logout</button>
            </nav>
        </>
    );
}

export default Dashboard;