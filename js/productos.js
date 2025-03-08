import { listaProductos } from "/js/listaProductos.js";

function crearTarjeta(containerProductos, producto) {
    //creamos la sección
    let containerProductos__producto = document.createElement('section');
    containerProductos__producto.classList.add('containerProductos__producto');

    //creamos el div img
    let containerProductos__producto__img = document.createElement('div');
    containerProductos__producto__img.classList.add('containerProductos__producto__img');

    //Creamos la imagen de portada
    let portada = document.createElement('img');
    portada.src = producto.portadaImg;
    portada.classList.add('containerProductos__producto__img__portada');
    portada.id = producto.isbn;
    portada.style.cursor = "pointer";

    //añadimos la portada a el div y el div a el contendor productos
    containerProductos__producto__img.appendChild(portada);
    containerProductos__producto.appendChild(containerProductos__producto__img);

    //Creamos el contenedor de info
    let containerProductos__producto__info = document.createElement('div');
    containerProductos__producto__info.classList.add('containerProductos__producto__info');

    //creamos el titulo
    let containerProductos__producto__info__titulo = document.createElement('h2');
    containerProductos__producto__info__titulo.classList.add('containerProductos__producto__info__titulo');
    containerProductos__producto__info__titulo.textContent = producto.titulo;

    //creamos el hr
    let hr = document.createElement('hr');

    //creamos p de precio
    let containerProductos__producto__info__precio = document.createElement('p');
    containerProductos__producto__info__precio.classList.add('containerProductos__producto__info__precio');
    containerProductos__producto__info__precio.textContent = producto.precio;
    //creamos p de autor
    let containerProductos__producto__info__autor = document.createElement('p');
    containerProductos__producto__info__autor.classList.add('containerProductos__producto__info__autor');
    containerProductos__producto__info__autor.textContent = producto.autor;

    //creamos boton
    let botonVermas = document.createElement('button');
    botonVermas.classList.add('verMas');
    botonVermas.textContent = "Ver más";

    //creamos div info adicional
    let containerProductos__producto__info__adicional = document.createElement('div');
    containerProductos__producto__info__adicional.classList.add('containerProductos__producto__info__adicional');

    let containerProductos__producto__info__adicional__Formato = document.createElement('p');
    containerProductos__producto__info__adicional__Formato.classList.add('containerProductos__producto__info__adicional__Formato');
    containerProductos__producto__info__adicional__Formato.innerText = " " + producto.formato;
    let containerProductos__producto__info__adicional__Tipo = document.createElement('p');
    containerProductos__producto__info__adicional__Tipo.classList.add('containerProductos__producto__info__adicional__Tipo');
    containerProductos__producto__info__adicional__Tipo.innerText = producto.subtipo;
    let containerProductos__producto__info__adicional__Paginas = document.createElement('p');
    containerProductos__producto__info__adicional__Paginas.classList.add('containerProductos__producto__info__adicional__Paginas');
    containerProductos__producto__info__adicional__Paginas.innerText = (Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    let containerProductos__producto__info__adicional__ISBN = document.createElement('p');
    containerProductos__producto__info__adicional__ISBN.classList.add('containerProductos__producto__info__adicional__ISBN');
    containerProductos__producto__info__adicional__ISBN.innerText = producto.isbn;


    containerProductos__producto__info__adicional.appendChild(containerProductos__producto__info__adicional__Formato);
    containerProductos__producto__info__adicional.appendChild(containerProductos__producto__info__adicional__Tipo);
    containerProductos__producto__info__adicional.appendChild(containerProductos__producto__info__adicional__Paginas);
    containerProductos__producto__info__adicional.appendChild(containerProductos__producto__info__adicional__ISBN);


    containerProductos__producto__info.appendChild(containerProductos__producto__info__titulo);
    containerProductos__producto__info.appendChild(containerProductos__producto__info__autor);
    containerProductos__producto__info.appendChild(containerProductos__producto__info__precio);
    containerProductos__producto__info.appendChild(botonVermas);
    containerProductos__producto__info.appendChild(containerProductos__producto__info__adicional);


    containerProductos__producto.appendChild(containerProductos__producto__info);
    containerProductos.appendChild(containerProductos__producto);

}

/**
 * Contruye un grid de productos a partir de una lista de productos y un contenedor
 * 
 * @param {array} listaProductos - lista de productos
 * @param {object} containerProductos - contenedor donde se va a renderizar el grid
 * @param {string} tipo - tipo de producto que se va a renderizar
 */
function contruirGridProductos(listaProductos, containerProductos, tipo) {
    //En caso de ser novedades ordenamos primero el array por fecha de publicacion
    if (tipo == "novedades") {
        //Ordenamos por fecha el array
        listaProductos.sort(function (a, b) {
            return b.anio_publicacion - a.anio_publicacion;
        });
        // console.log(listaProductos);
        //Mostramos los productos
        listaProductos.forEach(producto => {
            crearTarjeta(containerProductos, producto);
        });
    }

    //Si filtramos por comic o libros 
    else {

        listaProductos.forEach(producto => {
            if (tipo == producto.tipo) {
                crearTarjeta(containerProductos, producto);

            }
        });
    }

}
window.addEventListener('DOMContentLoaded', () => {
    // let lang = localStorage.getItem("lang");
    const containerProductos = document.querySelector('.containerProductos');
    let seccion = window.location.pathname.substring(6, window.location.pathname.length - 5);
    console.log(seccion);


    contruirGridProductos(listaProductos, containerProductos, seccion);

    const verMas = document.querySelectorAll('.verMas');


    //Controlar el mostrar info
    verMas.forEach(boton => {

        boton.addEventListener('click', (e) => {
            //Si esta oculto se muestra y si está mostrado se oculta

            if (boton.nextElementSibling.style.display == "block") {
                boton.nextElementSibling.style.display = "none";
                boton.textContent = "Ver más";

            } else {
                e.target.parentNode.parentNode.style.height = "auto";
                boton.nextElementSibling.style.display = "block";
                boton.textContent = "Ocultar";

            }
        });
    });

    containerProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('containerProductos__producto__img__portada')) {
            console.log(e.target.id);
            document.cookie = `ISBN=${e.target.id};`;
            window.location.href = "../html/producto.html";
        }
    });

});