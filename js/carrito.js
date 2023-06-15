let productosEnCarrito = localStorage.getItem("productosEnElCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contCarritoVacio = document.querySelector("#carritoVacio")
const contCarritoProductos = document.querySelector("#carritoProductos")
const contCarritoAcciones = document.querySelector("#carritoAcciones")
const contCarritoComprado = document.querySelector("#carritoComprado")
let botonesEliminar = document.querySelectorAll(".carritoProductoEliminar")
const botonVaciar = document.querySelector("#vaciar")
const contTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#comprar")

function cargarProductosCarrito(){

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contCarritoVacio.classList.add("disabled");
        contCarritoProductos.classList.remove("disabled");
        contCarritoAcciones.classList.remove("disabled");
        contCarritoComprado.classList.add("disabled");
    
        contCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
                <img class="carritoProductoImagen" src=".${producto.imagen}" alt="${producto.nombre}">
                <div class="carritoProductoTitulo">
                    <small>Título</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carritoProductoCantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carritoProductoPrecio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carritoProductoSubtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carritoProductoEliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
            `;
    
            contCarritoProductos.append(div)
        })
        
    }else{
    
        contCarritoVacio.classList.remove("disabled");
        contCarritoProductos.classList.add("disabled");
        contCarritoAcciones.classList.add("disabled");
        contCarritoComprado.classList.add("disabled");
    
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carritoProductoEliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productosEnElCarrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productosEnElCarrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productosEnElCarrito", JSON.stringify(productosEnCarrito));
    
    contCarritoVacio.classList.add("disabled");
        contCarritoProductos.classList.add("disabled");
        contCarritoAcciones.classList.add("disabled");
        contCarritoComprado.classList.remove("disabled");

}