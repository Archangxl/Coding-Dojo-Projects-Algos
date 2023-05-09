import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const CreateRecipe = (props) => {

    const {userId} = useParams();
    const [name, setName] = useState("");
    const [ingredient0, setIngredient0] = useState("");
    const [instruction0, setInstruction0] = useState("");

    const navigate = useNavigate();
    const logout = (e) => {
        axios
            .get('http://localhost:8000/api/logout')
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/'+userId+'/createRecipe', {name: name, ingredient0, instruction0}
        , {withCredentials: true})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }
    

    return (
        <>
            <nav>
                <h1>My Cookbook</h1>
                <button onClick={logout}>Logout</button>
                <Link to={'/' + userId + '/dashboard'}>Dashboard</Link>
            </nav>
            <header>
                <h2>Create Recipe</h2>
            </header>
            <main>

                <form onSubmit={onSubmit}>

                    <label>Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input>

                    <label>Ingredients: </label>
                    <input type="text" onChange={(e) => setIngredient0(e.target.value)} value={ingredient0}></input>

                    <label>Instructions: </label>
                    <input type="text" onChange={(e) => setInstruction0(e.target.value)} value={instruction0}></input>

                    <button>Create</button>
                </form>

            </main>
        </>
    );
}

export default CreateRecipe;