import React from "react"
import Close from "../assets/close.png"
import IngredientsLists from "./IngredientsLists"
import Recipe from "./Recipe"
// import { getRecipeFromChatGPT } from "../api"
import { getRecipeFromSpoonacular } from "../api"




export default function Main() {

    const [ingredientsList, setIngredientsList] = React.useState([])
    const [recipe, setRecipe] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const ingredientsListItems = ingredientsList.map(ingredient => (
        <li key={ingredient}>
            <span className="ingredient-text">{ingredient}</span>
            <span onClick={() => handleDelete(ingredient)} className="cross-icon"><img src={Close} alt="Close-Icon"/></span>
        </li>
    ))
    function handleDelete(ingredientToRemove) {
        setIngredientsList(prev =>
          prev.filter(ingredient => ingredient !== ingredientToRemove)
        )
    }


    function handleSubmit(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim() === "") {alert("Please Enter an Ingredient"); return}
        setIngredientsList((prev) => [...prev, newIngredient])
    }


    async function handleGetRecipe() {

        if (loading) return;
        setLoading(true);
        setError(null);
        setRecipe(null);
    
        // const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        console.log("Spoonacular API Key:", apiKey);
    
        try {
            const result = await getRecipeFromSpoonacular(ingredientsList, apiKey);
            if (result.error) {
                setError(result.error);
            } else {
                setRecipe(result);
            }
        } catch (e) {
            setError("Could not load recipe.");
        } finally {
            setLoading(false);
        }
    }
    
    


    return (
        <main className="main-content" >
            <div className="content-wrapper">
                <section className="description">
                    <h2>Welcome to Chef Claude🍳</h2>
                    <p>Your friendly kitchen assistant. Build ingredient lists, discover smart recipe suggestions, and never miss a step again!</p>
                </section>

                <section className="form-section"> 
                <h2 className="form-title">Start adding your ingredients</h2>
                    <form action={handleSubmit} className="add-ingredient-form">
                        <input 
                            type="text"
                            placeholder="e.g. oregano"
                            aria-label="Add ingredient"
                            name="ingredient"
                        />
                        <button type="submit">Add ingredient</button>
                    </form>
                </section>
                
                { ingredientsList.length ?
                    <IngredientsLists ingredientsListItems={ingredientsListItems} ingredientsList={ingredientsList} handleGetRecipe={handleGetRecipe}/>
                    : null
                }
                {loading && <p>Loading your recipe...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}


                <Recipe recipe={recipe} />
            </div>
        </main>
    )
}