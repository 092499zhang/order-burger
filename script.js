import { allFoods } from "./data-food.js"
console.log(allFoods);

const foodContainer = document.getElementById('foodContainer');
const orderCounts = {};
const orderDetails = document.getElementById('orderDetails');

const updateOrderDetailsVisibility = () => {
  const hasOrder = Object.values(orderCounts).some((count) => count > 0);
  orderDetails.style.opacity = hasOrder ? 1 : 0;
};

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
updateOrderDetailsVisibility();

 foodContainer.addEventListener('click', (e) => {
  
if (e.target.classList.contains('add-to-order-btn')) {
  const foodName = e.target.dataset.foodName;

  orderCounts[foodName] = (orderCounts[foodName] || 0) + 1;

  const quantityEl = document.querySelector(
  `[data-food-quantity="${foodName}"]`
);
quantityEl.textContent = orderCounts[foodName];
  updateOrderDetailsVisibility();
}

if (e.target.classList.contains('deduct-to-order-btn')) {
  const foodName = e.target.dataset.foodName;

  orderCounts[foodName] = Math.max((orderCounts[foodName] || 0) - 1, 0);

  const quantityEl = document.querySelector(
    `[data-food-quantity="${foodName}"]`
  );

  quantityEl.textContent = orderCounts[foodName];
  updateOrderDetailsVisibility();
}

}); 