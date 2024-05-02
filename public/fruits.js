document.addEventListener('DOMContentLoaded', () => {
    // Get all decrease buttons, quantity inputs, and increase buttons
    const decreaseBtns = document.querySelectorAll('.reveal');
    const quantityInputs = document.querySelectorAll('.quantity-btn1');
    const increaseBtns = document.querySelectorAll('.reveal1');

    // Attach event listeners to each quantity control
    decreaseBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInputs[index].value);
            if (currentQuantity > 1) {
                quantityInputs[index].value = currentQuantity - 1;
            }
        });
    });

    increaseBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInputs[index].value);
            if (currentQuantity < 10) {
                quantityInputs[index].value = currentQuantity + 1;
            }
        });
    });
});

    function addToCart(name, price, img) {
    // Retrieve existing cart items from localStorage or initialize as an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Create a new item object
    const newItem = { name, price, img };

    // Add the new item to the cartItems array
    cartItems.push(newItem);

    // Update localStorage with the updated cartItems array
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.alert(`"${name}" has been added to your cart!`);
    // Redirect to the cart page
    window.location.href = 'Cart.html';
}


document.addEventListener('DOMContentLoaded', () => {
    const cartItemContainer = document.getElementById('cart-item');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function createCartItemElement(item) {
        const { name, price, img } = item;

        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <div style="display: flex;">
                <div class="veg-top-menu">
                    <img src="${img}" class="cart-item-img" alt="${name}" width="200px">
                </div>
                <div class="veg-top-menu1">
                    <p style="margin: 0px; color: gray;">Organic Farm</p>
                    <h2 style="margin: 10px 0px;" class="cart-item-name">${name}</h2>
                    <p style="font-size: x-large;" class="cart-item-price">Price: ₹ ${price}/Kg</p>
                    <div class="number-input-container">
                        <p>Quantity:</p>
                        <button class="quantity-btn reveal" onclick="decreaseQuantity('${name}')"><</button>
                        <input type="number" class="quantity-btn1" value="1" min="1" max="10">
                        <button class="quantity-btn reveal1" onclick="increaseQuantity('${name}')">></button>
                        <button onclick="removeFromCart('${name}')" class="remove-btn">Remove</button>
                    </div>
                </div>
            </div>`;
            return cartItem;
    }

    function renderCartItems() {
        cartItemContainer.innerHTML = '';

        cartItems.forEach(item => {
            const cartItem = createCartItemElement(item);
            cartItemContainer.appendChild(cartItem);
        });
    }

    window.addToCart = function(name, price, img) {
        // Check if item already exists in cart
        const existingItem = cartItems.find(item => item.name === name);
        if (!existingItem) {
            window.alert(`"${name}" has been added to your cart!`);
            const newItem = { name, price, img };
            cartItems.push(newItem);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
            // Show alert message indicating item has been added
            window.alert(`"${name}" has been added to your cart!`);
        } else {
            // Item already exists in cart, show a different message if needed
            window.alert(`"${name}" is already in your cart.`);
        }
    };
    

    window.removeFromCart = function(name) {
        // Find index of item to remove
        const index = cartItems.findIndex(item => item.name === name);

        if (index !== -1) {
            // Remove item from cartItems array
            cartItems.splice(index, 1);

            // Update localStorage with updated cart items
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Render updated cart items
            renderCartItems();
        }
    };

    renderCartItems(); // Initial render of cart items
});
