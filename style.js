// index.js

// 1. Data Structure: The Recipe Database
const recipes = [
    {
        name: "Classic Tomato Pasta",
        ingredients: ["pasta", "tomato", "garlic", "olive oil"],
        diet: "vegan",
        instructions: "Boil pasta. Sauté garlic in oil, add tomatoes, and mix."
    },
    {
        name: "Cheesy Omelette",
        ingredients: ["egg", "cheese", "butter"],
        diet: "vegetarian",
        instructions: "Whisk eggs, fry in butter, add cheese and fold."
    },
    {
        name: "Garlic Roasted Broccoli",
        ingredients: ["broccoli", "garlic", "olive oil"],
        diet: "vegan",
        instructions: "Toss broccoli with oil and garlic. Roast at 200°C for 20 mins."
    },
    {
        name: "Greek Salad",
        ingredients: ["tomato", "cucumber", "feta cheese", "olive oil"],
        diet: "vegetarian",
        instructions: "Chop vegetables, toss with oil and crumble feta on top."
    }
];

// 2. The Recommendation Engine
function findRecipes() {
    const input = document.getElementById('ingredientInput').value.toLowerCase();
    const dietFilter = document.getElementById('dietFilter').value;
    const userIngredients = input.split(',').map(item => item.trim());
    
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Filter and Score recipes
    const matches = recipes.filter(recipe => {
        // Filter by Diet first
        const matchesDiet = (dietFilter === 'all' || recipe.diet === dietFilter);
        
        // Rule: At least ONE ingredient must match to show up
        const hasMatch = recipe.ingredients.some(ing => userIngredients.includes(ing));
        
        return matchesDiet && hasMatch;
    }).map(recipe => {
        // Calculate "Match Percentage"
        const matchedIngs = recipe.ingredients.filter(ing => userIngredients.includes(ing));
        const score = Math.round((matchedIngs.length / recipe.ingredients.length) * 100);
        return { ...recipe, score };
    });

    // Sort by highest match score
    matches.sort((a, b) => b.score - a.score);

    // 3. Render to UI
    if (matches.length === 0) {
        resultsContainer.innerHTML = "<p>No recipes found. Try adding more ingredients!</p>";
        return;
    }

    matches.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.name} <span class="badge">${recipe.score}% Match</span></h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <span class="diet-tag">${recipe.diet}</span>
        `;
        resultsContainer.appendChild(card);
    });
}
