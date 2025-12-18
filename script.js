import { allFoods } from "./data-food.js"
console.log(allFoods);

const foodContainer = document.getElementById('foodContainer');

const renderFoodItems = () => {
const foodItemsHTML = allFoods.map((food) => {
    return `
    <div class="food-item">
      <div class="food-left">
        <div class="food-pic" aria-hidden="true">${food.pic}</div>
        <div class="food-info">
          <h3 class="food-name">${food.foodName}</h3>
          <p class="food-description">${food.discription}</p>
          <p class="food-price">$${food.price}</p>
        </div>
      </div>

      <button class="deuct-to-order-btn" type="button" aria-label="Add ${food.foodName} to order">-</button>
      <button class="add-to-order-btn" type="button" aria-label="Add ${food.foodName} to order">+</button>
      
    </div>
  `;
}   ).join('');

foodContainer.innerHTML = foodItemsHTML;
};

renderFoodItems();  