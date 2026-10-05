/**
 * STACKLY COFFEE — Cart & State Management
 * Persistent storage using localStorage with GSAP animated micro-interactions.
 */

const CART_STORAGE_KEY = 'stackly_coffee_cart';
const WISHLIST_STORAGE_KEY = 'stackly_coffee_wishlist';

// Get Cart items
function getCart() {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

// Save Cart items
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

// Add item to Cart
function addToCart(item, quantity = 1, sourceElement = null) {
  const cart = getCart();
  const existingIndex = cart.findIndex(p => p.id === item.id && p.grind === (item.grind || 'Whole Bean'));

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: item.id || 'item-' + Date.now(),
      name: item.name || 'Signature Coffee',
      price: Number(item.price) || 680,
      weight: item.weight || '250g',
      grind: item.grind || 'Whole Bean',
      image: item.image || 'assets/midnight-roast.webp',
      quantity: quantity
    });
  }

  saveCart(cart);

  if (sourceElement && typeof gsap !== 'undefined') {
    flyToCart(sourceElement, item.image);
  }

  showToast(`Added "${item.name}" to your cart.`);
}

// Update item quantity
function updateQuantity(id, grind, delta) {
  const cart = getCart();
  const item = cart.find(p => p.id === id && p.grind === grind);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id, grind);
      return;
    }
    saveCart(cart);
  }
}

// Remove item from Cart
function removeFromCart(id, grind) {
  let cart = getCart();
  const removedItem = cart.find(p => p.id === id && p.grind === grind);
  cart = cart.filter(p => !(p.id === id && p.grind === grind));
  saveCart(cart);
  if (removedItem) {
    showToast(`Removed "${removedItem.name}" from your cart.`);
  }
}

// Clear entire Cart
function clearCart() {
  saveCart([]);
  showToast('Cart has been cleared.');
}

// Calculate Total Items Count
function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

// Calculate Subtotal Price
function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)), 0);
}

// Update Cart Badge Counters on Navbars
function updateCartBadges() {
  const count = getCartCount();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.remove('bump');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bump');
  });
}

// Flying Item to Cart Animation using GSAP
function flyToCart(startElement, imageUrl) {
  const targetCartBtn = document.querySelector('.cart-icon-btn');
  if (!targetCartBtn || !startElement) return;

  const startRect = startElement.getBoundingClientRect();
  const targetRect = targetCartBtn.getBoundingClientRect();

  const flyImg = document.createElement('img');
  flyImg.src = imageUrl || 'assets/midnight-roast.webp';
  flyImg.className = 'flying-item';
  flyImg.style.left = `${startRect.left + startRect.width / 2 - 24}px`;
  flyImg.style.top = `${startRect.top + startRect.height / 2 - 24}px`;
  document.body.appendChild(flyImg);

  if (typeof gsap !== 'undefined') {
    gsap.to(flyImg, {
      duration: 0.8,
      left: targetRect.left + targetRect.width / 2 - 12,
      top: targetRect.top + targetRect.height / 2 - 12,
      scale: 0.2,
      opacity: 0.4,
      rotation: 360,
      ease: 'power3.inOut',
      onComplete: () => {
        flyImg.remove();
        updateCartBadges();
      }
    });
  } else {
    setTimeout(() => flyImg.remove(), 800);
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-mug-hot text-copper"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Wishlist Functionality
function getWishlist() {
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(item, buttonEl = null) {
  let list = getWishlist();
  const index = list.findIndex(i => i.id === item.id);
  if (index > -1) {
    list.splice(index, 1);
    if (buttonEl) buttonEl.classList.remove('active');
    showToast(`Removed "${item.name}" from wishlist.`);
  } else {
    list.push(item);
    if (buttonEl) buttonEl.classList.add('active');
    showToast(`Saved "${item.name}" to wishlist.`);
  }
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();

  // Attach quick add buttons
  document.querySelectorAll('[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = {
        id: btn.dataset.id || 'prod-' + Math.floor(Math.random()*1000),
        name: btn.dataset.name || 'Specialty Coffee',
        price: Number(btn.dataset.price) || 680,
        weight: btn.dataset.weight || '250g',
        image: btn.dataset.image || 'assets/midnight-roast.webp',
        grind: 'Whole Bean'
      };
      addToCart(product, 1, btn);
    });
  });
});
