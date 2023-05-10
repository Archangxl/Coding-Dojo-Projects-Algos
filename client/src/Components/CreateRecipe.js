import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const CreateRecipe = (props) => {

    const {userId} = useParams();
    const [name, setName] = useState("");
    const [ingredient0, setIngredient0] = useState("");
    const [instruction0, setInstruction0] = useState("");
    const array = [{ingredient0: 'aa'}];

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



    const mapIngredients = (e) => {
        for(let i = 0; i < array.length; i++) {
            console.log(array);
        }
    }
    
    const addIngredient = (e) => {
        let j = array.length;
        let addition = 'ingredient' + j.toString();
        array.push({[addition] : ''});
        
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

                    {
                        array.map((ingredient, index) => {
                            return (
                                <div key={index}>
                                    <label>Instructions: </label>
                                    <input type="text" onChange={(e) => ingredient = e.target.value} value={ingredient.value}></input>
                                </div>
                            );
                        })
                    }

                    <label>Instructions: </label>
                    <input type="text" onChange={(e) => setInstruction0(e.target.value)} value={instruction0}></input>

                    <button>Create</button>
                </form>
                <button onClick={mapIngredients}>Grab</button>
                <button onClick={addIngredient}>Add</button>
            </main>
        </>
    );
}

export default CreateRecipe;