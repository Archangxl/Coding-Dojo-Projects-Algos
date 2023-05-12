import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const Dashboard = () => {
    const {userId} = useParams();
    const [recipes, setRecipes] = useState([]);
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
                setRecipes(res.data.cookbook);
            })
            .catch(err => {
                console.log(err);
            });
    });

    return (
        <>
            <nav>
                <h1>My Cookbook</h1>
                <button onClick={logout}>Logout</button>
                <Link to={'/'+userId+'/createRecipe'}>Create a Recipe</Link>
            </nav>

            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recipes.map((recipe, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{recipe.name}</td>
                                        <td><button onClick={(e) => {
                                            axios.delete('http://localhost:8000/api/' +userId+ '/deleteRecipe/' + recipe._id, {withCredentials: true})
                                            .then(res => {
                                                navigate('/'+userId+'/dashboard');
                                            })
                                            .catch(err => console.log(err));
                                        }}>Delete</button></td>
                                        <td><button onClick={(e) => {
                                            navigate('/' +userId+ '/updateRecipe/' + recipe._id);
                                        }}>Updated</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </main>
        </>
    );
}

export default Dashboard;