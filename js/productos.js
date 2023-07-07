const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesCategorias = document.querySelectorAll(".botonCategoria")
const tituloPrincipal = document.querySelector(".tituloPrincipal")
let botonesAgregar = document.querySelectorAll(".productoAgregar")
const numero = document.querySelector("#numero")

async function pedirProductos(){
    response = await fetch("../json/productos.json")
    productos = await response.json()

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
    
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", function(){
                Toastify({
                    text: "Producto Agregado",
                    duration: 1000,
                    style:{
                        fontSize: "20px",
                        background: "#60db1a",
                        margin: "15px",
                        "box-shadow": "0 3px 12px 0 rgba(0,0,0,.3)",
                        "border-radius":"1rem"
                    }
                }).showToast();
            })
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
}

pedirProductos();