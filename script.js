import { allFoods } from "./data-food.js";
console.log(allFoods);

const foodContainer = document.getElementById("foodContainer");
const orderContainer = document.getElementById("orderContainer");
const orderDetails = document.getElementById("orderDetails");

// State
const orderCounts = {};

// Money helper: avoid floating point artifacts and always show 2 decimals
const formatMoney = (value) => {
  const n = Number(value) || 0;
  const rounded = Math.round((n + Number.EPSILON) * 100) / 100;
  return rounded.toFixed(2);
};

const updateOrderDetailsVisibility = () => {
  const hasOrder = Object.values(orderCounts).some((count) => count > 0);
  orderDetails.style.opacity = hasOrder ? 1 : 0;
};

const renderFoodItems = () => {
  const foodItemsHTML = allFoods
    .map((food) => {
      const { foodName, discription, pic, price } = food;
      return `
        <div class="food-item">
          <div class="food-left">
            <div class="food-pic" aria-hidden="true">${pic}</div>
            <div class="food-info">
              <h3 class="food-name">${foodName}</h3>
              <p class="food-description">${discription}</p>
              <p class="food-price">$${formatMoney(price)}</p>
            </div>
          </div>

          <div class="food-right">
            <button class="deduct-to-order-btn" type="button" aria-label="Remove ${foodName} from order" data-food-name="${foodName}">-</button>
            <button class="add-to-order-btn" type="button" aria-label="Add ${foodName} to order" data-food-name="${foodName}">+</button>
            <div class="food-quantity" aria-live="polite" aria-atomic="true" data-food-quantity="${foodName}">0</div>
          </div>
        </div>
      `;
    })
    .join("");

  foodContainer.innerHTML = foodItemsHTML;
};

const renderOrder = () => {
  let total = 0;

  const rows = Object.entries(orderCounts)
    .filter(([_, quantity]) => quantity > 0)
    .map(([foodName, quantity]) => {
      const food = allFoods.find((f) => f.foodName === foodName);
      if (!food) return "";
      const { price } = food;

      const lineTotal = price * quantity;
      total += lineTotal;

      return `
        <div class="order-row">
          <span class="order-name">${foodName}</span>
          <span class="order-qty">x${quantity}</span>
          <span class="order-price">$${formatMoney(lineTotal)}</span>
        </div>
      `;
    })
    .join("");

  const totalRow = total > 0
    ? `
      <div class="order-divider" aria-hidden="true"></div>
      <div class="order-total-row">
        <span class="order-total-label">Total</span>
        <span class="order-total-price">$${formatMoney(total)}</span>
      </div>
    `
    : "";

  orderContainer.innerHTML = rows + totalRow;
};

// Initial render
renderFoodItems();
renderOrder();
updateOrderDetailsVisibility();

// Event delegation for + / -
foodContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.classList.contains("add-to-order-btn")) {
    const foodName = target.dataset.foodName;
    orderCounts[foodName] = (orderCounts[foodName] || 0) + 1;

    const quantityEl = document.querySelector(`[data-food-quantity="${foodName}"]`);
    if (quantityEl) quantityEl.textContent = String(orderCounts[foodName]);

    renderOrder();
    updateOrderDetailsVisibility();
  }

  if (target.classList.contains("deduct-to-order-btn")) {
    const foodName = target.dataset.foodName;
    orderCounts[foodName] = Math.max((orderCounts[foodName] || 0) - 1, 0);

    const quantityEl = document.querySelector(`[data-food-quantity="${foodName}"]`);
    if (quantityEl) quantityEl.textContent = String(orderCounts[foodName]);

    renderOrder();
    updateOrderDetailsVisibility();
  }
});