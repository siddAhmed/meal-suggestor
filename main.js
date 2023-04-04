import './style.css';

const theMealDbEndpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';

const mealName = document.getElementById('meal-name');
const mealImage = document.getElementById('meal-image');
const mealInstructions = document.getElementById('meal-instructions');
const mealIngredients = document.getElementById('meal-ingredients');
const mealCategory = document.getElementById('meal-category');
const getRecipeBtn = document.getElementById('get-recipe-btn');
const recipeLink = document.getElementById('recipe-link');
const youtubeLink = document.getElementById('youtube-link');

function renderMeals(mealDataObj) {
  mealName.innerText = mealDataObj.strMeal;
  mealImage.src = mealDataObj.strMealThumb;
  mealInstructions.innerText = mealDataObj.strInstructions;
  recipeLink.href = mealDataObj.strSource;
  youtubeLink.href = mealDataObj.strYoutube;
  mealCategory.innerText = `${mealDataObj.strCategory}, ${mealDataObj.strArea}`;

  const ingredientsArr = Object.keys(mealDataObj).filter(key => key.startsWith('strIngredient'));
  let ingredientsText = "";
  ingredientsArr.forEach(key => {
    if (mealDataObj[key]) {
      ingredientsText += mealDataObj[key] + ", ";
    }
  });
  console.log("ingredientsText", ingredientsText.slice(0, -2));
  mealIngredients.innerText = ingredientsText.slice(0, -2);
}

async function getMealData() {
  const mealsObj = await axios.get(theMealDbEndpoint);
  renderMeals(mealsObj.data.meals[0]);
}

// get meal data on button click
getRecipeBtn.addEventListener('click', getMealData);

// rendering the first meal automatically on page load
getMealData()

