// Base price for one sushi box
const BASE_PRICE = 4.5;

// Elements
const sushiCard = document.getElementById("card-sushi");
const itemOverlay = document.getElementById("item-overlay");
const backButton = document.getElementById("btn-back");
const qtyDisplay = document.getElementById("qty-display");
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const priceValue = document.getElementById("price-value");
const btnAddToCart = document.getElementById("btn-add-to-cart");
const notification = document.getElementById("success-notification");
const btnViewCart = document.getElementById("btn-view-cart");

// Sounds
const soundClick = document.getElementById("sound-click");
const soundMinus = document.getElementById("sound-minus");
const soundNotification = document.getElementById("sound-notification");

let quantity = 1;

// Update price text based on quantity
function updatePrice() {
  const total = BASE_PRICE * quantity;
  priceValue.textContent = total.toFixed(2);
}

// Safely play sound (handles autoplay restrictions quietly)
function playSafe(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {
    // ignore autoplay block
  });
}

// ===================== EVENT HANDLERS =====================

// Open item overlay when clicking Sushi card
sushiCard.addEventListener("click", () => {
  itemOverlay.classList.remove("hidden");
  itemOverlay.setAttribute("aria-hidden", "false");
  playSafe(soundClick);
});

// Back button closes overlay
backButton.addEventListener("click", () => {
  itemOverlay.classList.add("hidden");
  itemOverlay.setAttribute("aria-hidden", "true");
  playSafe(soundClick);
});

// Plus button increments quantity
btnPlus.addEventListener("click", () => {
  quantity += 1;
  qtyDisplay.textContent = quantity;
  updatePrice();
  playSafe(soundClick);
});

// Minus button decrements quantity (but not below 1)
btnMinus.addEventListener("click", () => {
  if (quantity > 1) {
    quantity -= 1;
    qtyDisplay.textContent = quantity;
    updatePrice();
    playSafe(soundMinus || soundClick);
  }
});

// Add to cart shows success notification
btnAddToCart.addEventListener("click", () => {
  notification.classList.remove("hidden");
  notification.setAttribute("aria-hidden", "false");
  playSafe(soundNotification);
});

// Clicking "View your cart" hides notification (for prototype)
btnViewCart.addEventListener("click", () => {
  notification.classList.add("hidden");
  notification.setAttribute("aria-hidden", "true");
  playSafe(soundClick);
});

// Clicking anywhere outside the card also hides notification
notification.addEventListener("click", (event) => {
  if (event.target === notification) {
    notification.classList.add("hidden");
    notification.setAttribute("aria-hidden", "true");
  }
});

// Initial price display
updatePrice();
