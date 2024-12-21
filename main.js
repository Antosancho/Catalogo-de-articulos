const button = document.querySelector('#carrito');
const ventana = document.querySelector('.header__carrito_ventana');
const prodList = document.querySelector('.main__productos');
const vaciarButton = document.querySelector('.carrito__vaciarButton');
const carrito = document.querySelector('.carrito__table');
const carritoBody = document.querySelector('.carrito__table__body');
const header = document.querySelector('.header');
const tituloButtonContainer = document.querySelector('.header__titulo_button-container');
let articulosCarrito = [];


button.addEventListener('click', e => {
    e.preventDefault();
    ventana.classList.toggle('show');
    header.classList.toggle('style');
    tituloButtonContainer.classList.toggle('style');
});

cargarEventsListeners();

function cargarEventsListeners() {
    // Agregar producto al carrito
    prodList.addEventListener('click', agregarCarrito);
    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarAticulo);
    // Vaciar carrito
    vaciarButton.addEventListener('click', e => {
        e.preventDefault();
        while (carritoBody.firstChild) {
            carritoBody.removeChild(carritoBody.firstChild);
        }
        articulosCarrito = [];
    })
}

// agrega el producto al carrito

function agregarCarrito(e) {
    if (e.target.classList.contains('producto__button')) {
        e.preventDefault();
        const articuloSeleccionado = e.target.parentElement.parentElement;
        leerDatos(articuloSeleccionado);
    }
}

// elimina el producto del carrito

function eliminarAticulo(e) {
    if(e.target.classList.contains("carrito__vaciarButton")) {
        const articuloId = e.target.getAttribute('data-id');
        console.log(articuloId);
        // Elimina el articulo
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

function leerDatos(articulo) {
    // Crea un objeto con el contenido del producto actual
    const infoProducto = {
        imagen: articulo.querySelector('img').src,
        nombre: articulo.querySelector('.producto__text').textContent,
        precio: articulo.querySelector('.producto__precio').textContent,
        id: articulo.getAttribute('id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(articulo => articulo.id === infoProducto.id);
    if (existe) {
        // Actualiza la cantidad y escapa de la función
        articulosCarrito = articulosCarrito.map(articulo => {
            if (articulo.id === infoProducto.id) {
                articulo.cantidad++;
                return articulo;
            }
            else return articulo;
        });
    } else {
        // Agrega el producto al carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    

    console.log(articulosCarrito);
    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {

    // Limpiar el HTML

    carritoBody.innerHTML = '';

    // Recorre el carrito y genera el HTML

    articulosCarrito.forEach(articulo => {
        const row = document.createElement(`tr`);
        console.log(row);
        row.innerHTML = `
            <td>
                <img src="${articulo.imagen}" class="tbody__img">
            </td>
            <td>${articulo.nombre}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.cantidad}</td>
            <td>
                <a href="#" class="carrito__vaciarButton eliminar" data-id="${articulo.id}">X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody

        console.log(row);
        carritoBody.appendChild(row);
    });
}
