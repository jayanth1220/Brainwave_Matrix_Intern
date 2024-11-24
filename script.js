let cart = []; // Simulated cart data

// Sample products categorized by type
const products = [
    { id: 1, name: 'Laptop', price: 1000, category: 'electronics', image: 'laptop.jpg' },
    { id: 2, name: 'Smartphone', price: 500, category: 'electronics', image: 'smartphone.jpg' },
    { id: 3, name: 'Headphones', price: 100, category: 'electronics', image: 'headphones.jpg' },
    { id: 4, name: 'Shoes', price: 50, category: 'clothes', image: 'shoes.jpg' },
    { id: 5, name: 'T-Shirt', price: 20, category: 'clothes', image: 'tshirt.jpg' },
    { id: 6, name: 'Smartwatch', price: 200, category: 'accessories', image: 'smartwatch.jpg' },
    { id: 7, name: 'Sunglasses', price: 25, category: 'accessories', image: 'sunglasses.jpg' }
];

// Load all products onto the page
function loadProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Filter products by category
function filterCategory(category) {
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    loadProducts(filteredProducts);
}

// Add item to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').innerText = cartCount;
}

// View Cart
function viewCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItemsList.innerHTML = ''; // Clear previous list

    cart.forEach(item => {
        cartItemsList.innerHTML += `<li>${item.name} - $${item.price}</li>`;
        total += item.price;
    });

    cartTotal.innerText = `Total: $${total}`;
    document.getElementById('cart-modal').style.display = 'flex';
}

// Close Cart
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Checkout Section
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const shippingMethod = document.getElementById('shipping-method').value;
    
    // Calculate shipping cost
    let shippingCost = 0;
    if (shippingMethod === 'express') {
        shippingCost = 15;
    } else if (shippingMethod === 'standard') {
        shippingCost = 5;
    }

    // Calculate total cost
    const itemTotal = cart.reduce((sum, item) => sum + item.price, 0);
    const totalCost = itemTotal + shippingCost;

    // Show order summary
    alert(`Order Summary:
    Name: ${name}
    Address: ${address}
    Shipping: ${shippingMethod === 'express' ? 'Express Shipping' : 'Standard Shipping'} - $${shippingCost}
    Total: $${totalCost}`);

    // Clear cart after checkout
    emptyCart();
    cancelCheckout();
});

// Empty Cart
function emptyCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    viewCart();
}

// Open Checkout
function openCheckout() {
    document.getElementById('checkout-section').style.display = 'block';
}

// Cancel Checkout
function cancelCheckout() {
    document.getElementById('checkout-section').style.display = 'none';
}

// Load products on page load
window.onload = loadProducts(products);
