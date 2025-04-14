let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItems = document.querySelector("#cart-items tbody");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    document.getElementById("cart-total").textContent = total.toFixed(2);
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity, 10);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    alert("Proceeding to checkout!");
    localStorage.removeItem("cart");
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);
