let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// ===============================
// MENU RESPONSIVE
// ===============================
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ===============================
// CARRITO LATERAL
// ===============================
cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// ===============================
// AGREGAR PRODUCTOS
// ===============================
function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    }

    updateCartUI();
    cartSidebar.classList.add("active");
}

// ===============================
// ACTUALIZAR UI
// ===============================
function updateCartUI() {
    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; gap:10px; margin-bottom:18px; border-bottom:1px solid #eee; padding-bottom:15px;">
                <div>
                    <strong>${item.name}</strong>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>

                <div style="display:flex; align-items:center; gap:8px;">
                    <button onclick="changeQuantity(${index}, -1)" style="border:none;padding:6px 10px;border-radius:8px;cursor:pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)" style="border:none;padding:6px 10px;border-radius:8px;cursor:pointer;">+</button>
                    <button onclick="removeItem(${index})" style="border:none;padding:6px 10px;border-radius:8px;cursor:pointer;background:#c0392b;color:white;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
    cartCount.textContent = totalItems;
}

// ===============================
// CAMBIAR CANTIDAD
// ===============================
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartUI();
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// ===============================
// PEDIDO WHATSAPP
// ===============================
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let message = "👑 *Pedido - El Rey de las Empanadas*%0A%0A";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        message += `🛒 ${item.name} x${item.quantity} - $${subtotal}%0A`;
    });

    message += `%0A💰 *Total: $${total}*%0A`;
    message += `%0A📍 Hola, quiero hacer este pedido por favor.`;

    const phone = "529983154900";
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
}
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");

    if (window.scrollY > 40) {
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
    } else {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
    }
});const floatingEmpanada = document.querySelector(".floating-empanada");

document.addEventListener("mousemove", (e) => {
    if (!floatingEmpanada) return;

    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;

    floatingEmpanada.style.transform = `translate(${x}px, ${y}px)`;
});