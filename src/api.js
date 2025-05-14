export async function getRecipeFromSpoonacular(ingredientsArr, apiKey) {
    const ingredients = ingredientsArr.join(",");
    const baseUrl = "https://api.spoonacular.com";

    try {
        // Step 1: Find matching recipe
        const searchRes = await fetch(
            `${baseUrl}/recipes/findByIngredients?ingredients=${ingredients}&number=1&ranking=1&apiKey=${apiKey}`
        );
        const searchData = await searchRes.json();

        if (!searchData.length) return "No recipes found.";

        const recipeId = searchData[0].id;

        // Step 2: Get full recipe info
        const infoRes = await fetch(
            `${baseUrl}/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`
        );
        const recipeInfo = await infoRes.json();

        return {
            title: recipeInfo.title,
            ingredients: recipeInfo.extendedIngredients.map(i => i.original),
            instructions: recipeInfo.instructions || "No instructions provided.",
            image: recipeInfo.image
        };

    } catch (err) {
        console.error("Spoonacular API error:", err);
        return { error: "Something went wrong while fetching the recipe." };
    }
}
