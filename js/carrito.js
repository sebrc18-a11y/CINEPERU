let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(titulo) {
    const pelicula = peliculas.find(p => p.titulo === titulo);
    if (!pelicula) {
        alert("Película no encontrada");
        return;
    }

    const itemExistente = carrito.find(item => item.titulo === titulo);
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            titulo: pelicula.titulo,
            imagen: pelicula.imagen,
            genero: pelicula.genero,
            precio: pelicula.precio || 15,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(`${titulo} agregada al carrito`);
}

function eliminarDelCarrito(titulo) {
    carrito = carrito.filter(item => item.titulo !== titulo);
    guardarCarrito();
    renderizarCarrito();
    actualizarContadorCarrito();
}

function cambiarCantidad(titulo, nuevaCantidad) {
    const item = carrito.find(item => item.titulo === titulo);
    if (!item) return;

    nuevaCantidad = parseInt(nuevaCantidad);
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(titulo);
        return;
    }
    item.cantidad = nuevaCantidad;
    guardarCarrito();
    renderizarCarrito();
    actualizarContadorCarrito();
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de vaciar el carrito?")) {
        carrito = [];
        guardarCarrito();
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}

function calcularSubtotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function calcularDescuento(porcentajePromocion = 0) {
    const subtotal = calcularSubtotal();
    let descuento = subtotal * (porcentajePromocion / 100);
    if (subtotal > 120) {
        descuento += subtotal * 0.10;
    }

    return descuento;
}

function calcularTotal(porcentajePromocion = 0) {
    return calcularSubtotal() - calcularDescuento(porcentajePromocion);
}

function renderizarCarrito() {
    const tbody = document.getElementById("carrito-body");
    const contador = document.getElementById("contador-peliculas");
    if (!tbody) return;

    if (carrito.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <p>Tu carrito está vacío</p>
                    <a href="peliculas.html" style="color: var(--primary);">← Ir a ver películas</a>
                </td>
            </tr>`;
        actualizarResumen(0);
        if (contador) contador.textContent = "Tienes 0 películas en tu lista";
        return;
    }

    tbody.innerHTML = carrito.map(item => `
        <tr>
            <td><img src="${item.imagen}" alt="${item.titulo}" style="width:80px; border-radius:8px;"></td>
            <td><strong>${item.titulo}</strong></td>
            <td>${item.genero}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" max="10"
                       class="cantidad-input"
                       onchange="cambiarCantidad('${item.titulo}', this.value)">
            </td>
            <td>S/. ${item.precio.toFixed(2)}</td>
            <td>S/. ${(item.precio * item.cantidad).toFixed(2)}</td>
            <td>
                <button class="btn-eliminar-carrito" onclick="eliminarDelCarrito('${item.titulo}')">🗑️</button>
            </td>
        </tr>`).join("");

    const totalPeliculas = carrito.reduce((total, item) => total + item.cantidad, 0);
    if (contador) contador.textContent = `Tienes ${totalPeliculas} película(s) en tu lista`;

    const promoSelect = document.getElementById("promocion");
    const descuento = promoSelect ? parseInt(promoSelect.value) : 0;
    actualizarResumen(descuento);
}

function actualizarResumen(porcentajeDescuento = 0) {
    const subtotalEl = document.querySelector(".resumen-subtotal");
    const descuentoEl = document.querySelector(".resumen-descuento");
    const totalEl = document.querySelector(".resumen-total");

    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento(porcentajeDescuento);
    const total = calcularTotal(porcentajeDescuento);

    if (subtotalEl) subtotalEl.textContent = `S/. ${subtotal.toFixed(2)}`;
    if (descuentoEl) descuentoEl.textContent = `S/. ${descuento.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `S/. ${total.toFixed(2)}`;
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarNotificacion(mensaje) {
    const notif = document.createElement("div");
    notif.className = "notificacion-carrito";
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.classList.add("saliendo");
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}


function actualizarContadorCarrito() {
    const enlaceCarrito = document.querySelector('a[href="carrito.html"]');
    if (!enlaceCarrito) return;

    enlaceCarrito.classList.add("carrito-link");

    const existente = enlaceCarrito.querySelector(".carrito-badge");
    if (existente) existente.remove();

    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    if (totalItems > 0) {
        const badge = document.createElement("span");
        badge.className = "carrito-badge";
        badge.textContent = totalItems;
        enlaceCarrito.appendChild(badge);
    }
}

function confirmarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    if (confirm("¿Confirmas la compra?")) {
        alert("Gracias por tu compra");
        carrito = [];
        guardarCarrito();
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const promoSelect = document.getElementById("promocion");
    if (promoSelect) {
        promoSelect.addEventListener("change", () => {
            actualizarResumen(parseInt(promoSelect.value));
        });
    }

    renderizarCarrito();
    actualizarContadorCarrito();
});