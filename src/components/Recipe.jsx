export default function Recipe({ recipe }) {
    if (!recipe) return null;

    return (
        <section className="recipe-section">
            <h2 className="recipe-title">🍽️ {recipe.title}</h2>

            <div className="recipe-image-wrapper">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                />
            </div>

            <div className="recipe-details-wrapper">
                <h3 className="section-heading">📝 Ingredients</h3>
                <ul className="recipe-ingredients-list">
                    {recipe.ingredients.map((item, idx) => (
                        <li key={idx} className="recipe-ingredient-item">
                            <span className="ingredient-icon">🌿</span>
                            {item}
                        </li>
                    ))}
                </ul>

                <h3 className="section-heading">👨‍🍳 Instructions</h3>
                <div className="recipe-instructions" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
        </section>
    );
}
