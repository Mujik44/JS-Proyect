const productos = [
    //GEMAS
    {
        id: "2000-gemas",
        nombre: "2000 Gemas", 
        imagen: "./image/gemas/2200gemas.webp",
        icono: "./image/gemas/iconogemas.png",
        categoria: {
            nombre: "Gemas",
            id: "gemas"
        },
        precio: 92.57
    },
    {
        id: "950-gemas",
        nombre: "950 Gemas", 
        imagen: "./image/gemas/1045gemas.webp",
        icono: "./image/gemas/iconogemas.png",
        categoria: {
            nombre: "Gemas",
            id: "gemas"
        },
        precio: 46.27
    },
    {
        id: "360-gemas",
        nombre: "360 Gemas", 
        imagen: "./image/gemas/396gemas.webp",
        icono: "./image/gemas/iconogemas.png",
        categoria: {
            nombre: "Gemas",
            id: "gemas"
        },
        precio: 18.25
    },
    {
        id: "170-gemas",
        nombre: "170 Gemas", 
        imagen: "./image/gemas/187gemas.webp",
        icono: "./image/gemas/iconogemas.png",
        categoria: {
            nombre: "Gemas",
            id: "gemas"
        },
        precio: 9.24
    },
    {
        id: "80-gemas",
        nombre: "80 Gemas", 
        imagen: "./image/gemas/88gemas.webp",
        icono: "./image/gemas/iconogemas.png",
        categoria: {
            nombre: "Gemas",
            id: "gemas"
        },
        precio: 4.36
    },
    {
        id: "30-gemas",
        nombre: "30 Gemas", 
        imagen: "./image/gemas/33gemas.webp",
        icono: "./image/gemas/iconogemas.png",
        categoria: {
            nombre: "Gemas",
            id: "gemas"
        },
        precio: 1.68
    },
    //MONEDAS
    {
        id: "2600-monedas",
        nombre: "2600 Monedas", 
        imagen: "./image/monedas/2600monedas.png",
        icono: "./image/monedas/iconomoneda.png",
        categoria: {
            nombre: "Monedas",
            id: "monedas"
        },
        precio: 15.68
    },
    {
        id: "1200-monedas",
        nombre: "1200 Monedas", 
        imagen: "./image/monedas/1200monedas.png",
        icono: "./image/monedas/iconomoneda.png",
        categoria: {
            nombre: "Monedas",
            id: "monedas"
        },
        precio: 7.84
    },
    {
        id: "400-monedas",
        nombre: "400 Monedas", 
        imagen: "./image/monedas/400monedas.png",
        icono: "./image/monedas/iconomoneda.png",
        categoria: {
            nombre: "Monedas",
            id: "monedas"
        },
        precio: 2.8
    },
    {
        id: "150-monedas",
        nombre: "150 Monedas", 
        imagen: "./image/monedas/150monedas.png",
        icono: "./image/monedas/iconomoneda.png",
        categoria: {
            nombre: "Monedas",
            id: "monedas"
        },
        precio: 1.12
    }
]

const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesCategorias = document.querySelectorAll(".botonCategoria")
const tituloPrincipal = document.querySelector(".tituloPrincipal")
let botonesAgregar = document.querySelectorAll(".productoAgregar")
const numero = document.querySelector("#numero")

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML = `
            <img class="productoImagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="productoDetalles">
                <h3 class="productoTitulo2"><img src="${producto.icono}" alt="icono de gema">${producto.nombre}</h3>
                <p class="productoPrecio">$${producto.precio}</p>
                <button class="productoAgregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

            cargarProductos(productosBoton);

        }else{

            tituloPrincipal.innerHTML = "TODOS LOS PRODUCTOS";

            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".productoAgregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productosEnElCarrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumero();

    localStorage.setItem("productosEnElCarrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumero(){
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}