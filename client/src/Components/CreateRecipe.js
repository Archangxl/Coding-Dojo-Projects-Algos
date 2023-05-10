import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const CreateRecipe = (props) => {

    const {userId} = useParams();
    const [name, setName] = useState("");
    const [ingredient, setIngredient] = useState([
        {ingredient0: ''},
        {ingredient1: ''},
        {ingredient2: ''},
        {ingredient3: ''},
        {ingredient4: ''},
        {ingredient5: ''},
        {ingredient6: ''},
        {ingredient7: ''},
        {ingredient8: ''},
        {ingredient9: ''},
        {ingredient10: ''},
        {ingredient11: ''},
        {ingredient12: ''},
        {ingredient13: ''},
        {ingredient14: ''},
        {ingredient15: ''},
        {ingredient16: ''},
        {ingredient17: ''},
        {ingredient18: ''},
        {ingredient19: ''}
    ]);
    const [instruction, setInstruction] = useState([
        {instruction0: ''},
        {instruction1: ''},
        {instruction2: ''},
        {instruction3: ''},
        {instruction4: ''},
        {instruction5: ''},
        {instruction6: ''},
        {instruction7: ''},
        {instruction8: ''},
        {instruction9: ''},
        {instruction10: ''},
        {instruction11: ''},
        {instruction12: ''},
        {instruction13: ''},
        {instruction14: ''},
        {instruction15: ''},
        {instruction16: ''},
        {instruction17: ''},
        {instruction18: ''},
        {instruction19: ''}
    ]);

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
        axios.post('http://localhost:8000/api/'+userId+'/createRecipe', {name: name, instruction, ingredient}
        , {withCredentials: true})
        .then(res => {
            console.log(res);
            navigate('/' + userId + '/dashboard');
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
                    {
                        ingredient.map((ingredients, index) => {
                            return (
                                <div key={index}>
                                    <label>Ingredient {index + 1}: </label>
                                    <input type="text" onChange={(e) => ingredient[index]['ingredient' + index.toString()] = e.target.value} value={ingredient['ingredient' + index.toString()]}></input>
                                </div>
                            );
                        })
                    }
                    {
                        instruction.map((instructions, index) => {
                            return (
                                <div key={index}>
                                    <label>Instruction {index + 1}: </label>
                                    <input type="text" onChange={(e) => instruction[index]["instruction"+ index.toString()] = e.target.value} value={instruction["instruction"+ index.toString()]}></input>
                                </div>
                            );
                        })
                    }

                    <button>Create</button>
                </form>
            </main>
        </>
    );
}

export default CreateRecipe;