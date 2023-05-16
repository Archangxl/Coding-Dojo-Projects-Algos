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
        <div className="background-color">
            <nav className="d-flex justify-content-between align-items-center">
                <h1>My Cookbook</h1>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/'+userId+'/createRecipe'}>Create a Recipe</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout}>Logout</a>
                    </li>
                </ul>
            </nav>

            <main>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th colSpan={2}>Actions</th>
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
                                        }}>Update</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </main>
            </div>
        </>
    );
}

export default Dashboard;