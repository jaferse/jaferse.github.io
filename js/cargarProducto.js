import { listaProductos } from "/js/listaProductos.js";

function getCookie(nombre) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let [clave, valor] = cookies[i].split("=");
        if (clave === nombre) return decodeURIComponent(valor); // Decodificar el valor
    }
    return null;
}


window.addEventListener('DOMContentLoaded', () => {
    console.log(getCookie("ISBN"));
    const ContainerProducto = document.querySelector(".ContainerProducto");

    let productoMostrar = listaProductos.find(producto => producto.isbn == (getCookie("ISBN").trim()));

    console.log(productoMostrar);

    document.querySelector('.Producto__img > img').src = productoMostrar.portadaImg;
    document.querySelector('.Producto__info__titulo').textContent = productoMostrar.titulo;
    document.querySelector('.Producto__info__autor').textContent = productoMostrar.autor;
    document.querySelector('.Producto__info__sinopsis').textContent = productoMostrar.sinopsis;
    document.querySelector('.Producto__info__caracteristicas__publicacion').textContent = productoMostrar.año_publicacion;
    document.querySelector('.Producto__info__caracteristicas__paginas').textContent = productoMostrar.paginas;
    document.querySelector('.Producto__info__caracteristicas__tipo').textContent = productoMostrar.tipo;
    document.querySelector('.Producto__info__caracteristicas__subtipo').textContent = productoMostrar.subtipo;
    document.querySelector('.Producto__info__caracteristicas__formato').textContent = productoMostrar.formato;
    document.querySelector('.Producto__info__caracteristicas__editorial').textContent = productoMostrar.editorial;
    document.querySelector('.Producto__info__precioComprar__precio__actual').textContent = productoMostrar.precio;
    document.querySelector('.Producto__info__precioComprar__precio__anterior').textContent = (Math.ceil(productoMostrar.precio * 1.05));


    //Comprobar el tipo
    // console.log(productoMostrar.tipo);


    const breadcrumb = document.querySelector('.breadcrumb');
    if (productoMostrar.tipo == "novela") {
        breadcrumb.innerHTML =/*HTML*/`
        <a class="breadcrumb__home" href="/index.html">
            <img src="/img/homeBreadcrumbs.png" alt="Icono de casa">
        </a>
        <img src="/img/arrowRight.png" alt="Flecha hacia la derecha">
        <a class="breadcrumb__home" href="/html/novela.html">
        <img src="/img/libroIcon.png" alt="Icono de casa">
        </a>
        <img src="/img/arrowRight.png" alt="Flecha hacia la derecha">
        <a class="breadcrumb__home" href="#">
        <img src="/img/bookIconBread.svg" alt="Icono de casa">
        </a>
        `;
        console.log("Libro");
    } else {
        console.log("Comic");
        breadcrumb.innerHTML =/*HTML*/`
        <a class="breadcrumb__home" href="/index.html">
        <img src="/img/homeBreadcrumbs.png" alt="Icono de casa">
        </a>
        <img src="/img/arrowRight.png" alt="Flecha hacia la derecha">
        <a class="breadcrumb__home" href="/html/comic.html">
        <img src="/img/comicIcon.png" alt="Icono de casa">
        </a>
        <img src="/img/arrowRight.png" alt="Flecha hacia la derecha">
        <a class="breadcrumb__home" href="#">
        <img src="/img/ComicIconBread.svg" alt="Icono de casa">
        </a>
        `;
    }
    ContainerProducto.style.visibility = 'visible';
});


