

export default function IngredientsLists(props){
    return(
        <section className="list-section">
            <h1> Ingredients at hand: </h1>
            <ul>
                {props.ingredientsListItems}
            </ul>
            { props.ingredientsList.length < 4 ?
                <p> Enter atleast 4 Ingredients! </p> :
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.handleGetRecipe}>Get a recipe</button>
                </div>
            }           
        </section>
    )
}