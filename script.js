let productos = [
    { id: 1, nombre: "Guitarra electrica roja", categoria: "instrumentos", precio: 9000, imagen: "guitarra2.jpg" },
    { id: 2, nombre: "Guitarra electrica blanca", categoria: "instrumentos", precio: 7000, imagen: "guitarra3.jpg" },
    { id: 3, nombre: "Bajo electrico rojo", categoria: "instrumentos", precio: 8000, imagen: "bajo3.jpg" },
    { id: 4, nombre: "Bajo electrico blanco y naranja", categoria: "instrumentos", precio: 7500, imagen: "bajo2.jpg" },
    { id: 5, nombre: "Batería", categoria: "instrumentos", precio: 10000, imagen: "bateria3.jpg" },
    { id: 6, nombre: "Pedal de distorsión", categoria: "accesorios", precio: 4000, imagen: "pedal1.jpg" },
    { id: 7, nombre: "Paquete de púas", categoria: "accesorios", precio: 500, imagen: "puas1.jpg" },
    { id: 8, nombre: "Palillos", categoria: "accesorios", precio: 1200, imagen: "palillos1.jpg" },
]

let carrito = []

let carritoJSON = JSON.parse(localStorage.getItem("carrito"))

if (carritoJSON) {
    carrito = carritoJSON
}

render(productos)
renderCarrito()

function render(Array) {

    let contenedor = document.getElementById("cartaProducto")
    contenedor.innerHTML = ""
    Array.forEach(producto => {
        let carta = document.createElement("div")
        carta.className = "carta"
        carta.innerHTML = `
    <h3>${producto.nombre}<h3>
    <img src=./img/${producto.imagen}>
    <p>$${producto.precio}<p>
    <div><button class="boton" id=${producto.id}>Comprar<div>

    `
        contenedor.appendChild(carta)
        let botonCarrito = document.getElementById(producto.id)
        botonCarrito.addEventListener("click", añadirCarrito)
    })
}

let botonfiltro = document.getElementsByClassName("filtro")
for (const botones of botonfiltro) {
    botones.addEventListener("click", filtrar)
}

function filtrar(event) {
    let filtrado = productos.filter(producto => producto.categoria === event.target.value)
    render(filtrado)
}

let restablecer = document.getElementById("restablecer")
restablecer.addEventListener("click", restablecerFiltrado)

function restablecerFiltrado() {
    render(productos)
}

function añadirCarrito(event) {
    let productoCarrito = productos.find(producto => producto.id === Number(event.target.id))
    carrito.push({
        id: productoCarrito.id,
        nombre: productoCarrito.nombre,
        precio: productoCarrito.precio
    })
    renderCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function renderCarrito(){
    let carritoFinal = document.getElementById("carritoVisible") 
    carritoFinal.innerHTML = ""
    carrito.forEach(producto => {

        carritoFinal.innerHTML += `<p>${producto.nombre} ${producto.precio}`
    })
}


let botonMostrarCarrito = document.getElementById("idBotonCarrito")
botonMostrarCarrito.addEventListener("click", mostrarCarrito)

function mostrarCarrito(){
    let contenedorPadre = document.getElementById("contenedorPadre")
    let carritoVisible = document.getElementById("carritoVisible")
    contenedorPadre.classList.toggle("alternarCarrito")
    carritoVisible.classList.toggle("alternarCarrito")
}   

let finalizar = document.getElementById("finalizar")
finalizar.addEventListener("click", finalizarCompra)

function finalizarCompra() {
    localStorage.clear()
}





