import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const Dashboard = () => {
    const {userId} = useParams();
    const [recipes, setRecipes] = useState({});
    const navigate = useNavigate();

    const logout = (e) => {
        axios
            .get('http://localhost:8000/api/logout', {withCredentials: true})
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }


    useEffect(()=> {
        axios
            .get('http://localhost:8000/api/'+userId+'/grabRecipes', {withCredentials: true})
            .then(res => {
                setRecipes(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
        {console.log(recipes)}
            <nav>
                <h1>My Cookbook</h1>
                <button onClick={logout}>Logout</button>
                <Link to={'/'+userId+'/createRecipe'}>Create a Recipe</Link>
            </nav>
        </>
    );
}

export default Dashboard;