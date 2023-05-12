import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateRecipe = () => {

    const {userId, id} = useParams();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [ingredient, setIngredient] = useState([]);
    const [instruction, setInstruction] = useState([]);

    const navigate = useNavigate();
    const logout = (e) => {
        axios
            .get('http://localhost:8000/api/logout')
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    useEffect(()=> {
        axios
            .get('http://localhost:8000/api/'+userId+'/grabOneRecipe/'+ id, {withCredentials: true})
            .then(res => {
                setName(res.data.name);
                for (let i = 0; i < res.data.ingredients.length; i++) {
                    ingredient.push({['ingredient' + i.toString()]:res.data.ingredients[i].item});
                }
                setIngredient(ingredient);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onSubmit = (e) => {

    }

    return (
        <>
            <nav>
                <h1>My Cookbook</h1>
                <button onClick={logout}>Logout</button>
                <Link to={'/' + userId + '/dashboard'}>Dashboard</Link>
                <button onClick={(e) => {
                    let length = ingredient.length;
                    let string = 'ingredient' + length;
                    ingredient.push({[string]: ''});
                    navigate('/'+userId+'/updateRecipe/' + id);
                }}>Add Ingredient</button>
                <button onClick={(e) => {
                    ingredient.pop();
                    navigate('/'+userId+'/updateRecipe/' + id);
                }
                }>Remove Ingredient</button>
                <button onClick={(e) => {
                    let length = instruction.length;
                    let string = 'instruction' + length;
                    instruction.push({[string] : ''});
                    navigate('/'+userId+'/updateRecipe/' + id);
                }}>Add Instruction</button>
                <button onClick={(e) => {
                    instruction.pop();
                    navigate('/'+userId+'/updateRecipe/' + id);
                }
                }>Remove Instruction</button>
            </nav>
            <header>
                <h2>Create Recipe</h2>
            </header>
            <main>

                <form onSubmit={onSubmit}>
                    
                    <p>{nameError}</p>
                    <label>Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input>
                    {
                        ingredient.map((ingredients, index) => {
                            console.log(ingredients);
                            return (
                                <div key={index}>
                                    <label>Ingredient {index + 1}: </label>
                                    <input type="text" onChange={(e) => ingredient[index]['ingredient' + index.toString()] = e.target.value} value={ingredients['ingredient' + index.toString()]}></input>
                                </div>
                            );
                        })
                    }
                    {
                        instruction.map((instructions, index) => {
                            return (
                                <div key={index}>
                                    <label>Instruction {index + 1}: </label>
                                    <textarea type="text" onChange={(e) => instruction[index]["instruction"+ index.toString()] = e.target.value} value={instruction[index]["instruction"+ index.toString()]}></textarea>
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
export default UpdateRecipe;