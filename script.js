import { allFoods } from "./data-food.js"
console.log(allFoods);

const foodContainer = document.getElementById('foodContainer');

const renderFoodItems = () => {
const foodItemsHTML = allFoods.map((food) => {
  //i think in here i need to use destructuring to get the values from the object
  // which is below
  const { foodName, discription, pic, price } = food;
    return `
    <div class="food-item">
      <div class="food-left">
        <div class="food-pic" aria-hidden="true">${pic}</div>
        <div class="food-info">
          <h3 class="food-name">${foodName}</h3>
          <p class="food-description">${discription}</p>
          <p class="food-price">$${price}</p>
        </div>
      </div>

      <div class="food-right"> 
      <button class="deduct-to-order-btn" type="button" aria-label="Add ${foodName} to order" data-food-name="${foodName}">-</button>
      <button class="add-to-order-btn" type="button" aria-label="Add ${foodName} to order" data-food-name="${foodName}">+</button>
      <div class="food-quantity" aria-live="polite" aria-atomic="true" data-food-quantity="${foodName}">0</div>
      </div>
    </div>
  `;
}   ).join('');

foodContainer.innerHTML = foodItemsHTML;
};

renderFoodItems();  

foodContainer.addEventListener('click', (e) => {
 if(e.target.dataset.foodName && e.target.classList.contains('add-to-order-btn')) {
console.log(e.target.dataset.foodQuantity);
}}); 