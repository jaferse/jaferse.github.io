document.addEventListener('DOMContentLoaded', () => {
    fetch("/lang/es.json")
        .then(response => response.json())
        .then(json => {

            //Si no hay local storage le asignamos español por defecto
            if (!localStorage.getItem("lang")) {
                localStorage.setItem("lang", "es");
            }
            // console.log(lang);

            let lang = localStorage.getItem("lang");
            actualizarTexto(json, lang);

            // Agregar eventos de traducción a los botones
            document.querySelectorAll(".translate").forEach(button => {
                let lang;
                button.addEventListener("click", function (e) {
                    console.log(e.target.classList);

                    if (e.target.parentElement.classList.contains("es")) {
                        lang = "es"; // Obtener el idioma del botón
                        this.classList.add("es");
                        this.classList.remove("en", "ja");
                    }
                    if (e.target.parentElement.classList.contains("en")) {
                        lang = "en"; // Obtener el idioma del botón
                        this.classList.add("en");
                        this.classList.remove("es", "ja");

                    }
                    if (e.target.parentElement.classList.contains("ja")) {
                        lang = "ja"; // Obtener el idioma del botón
                        this.classList.add("ja");
                        this.classList.remove("es", "es");

                    }
                    console.log(lang);

                    localStorage.setItem("lang", lang);
                    lang = localStorage.getItem("lang");
                    actualizarTexto(json, lang);
                });
            });
        }).catch(error => console.error("Error cargando el archivo JSON:", error));
});

// Función para actualizar los textos
function actualizarTexto(json, lang) {
    //Cambio de titulo
    document.title = json[lang]["title"];

    /**
     * Nav
     */
    document.querySelectorAll('.nav__menu .lang').forEach(element => {
        let data_lang = element.getAttribute('data-lang');
        element.textContent = json[lang]["nav"][data_lang];
    });

    /**
     * Placeholder de buscador
     */


    document.querySelector('#buscar').setAttribute("placeholder", json[lang]["buscador"]);

    /**
     * main
     */
    document.querySelectorAll('.main__bestSellers .lang').forEach(element => {
        let data_lang = element.getAttribute('data-lang');
        element.textContent = json[lang]["main__bestSellers"][data_lang]
    });

    /*
    *Sección nosotros
    */
    //Titulo
    if (document.querySelector('.welcome .lang')) {
        document.querySelector('.welcome .lang').textContent = json[lang]["nosotros"]["title"];
    }

    //Nosotros Hisotria
    document.querySelectorAll('.nosotros__historia__text .lang').forEach(element => {
        let data_lang = element.getAttribute('data-lang');
        element.textContent = json[lang]["nosotros"]["nosotros__historia"][data_lang];
    });

    //Nosotros Mision

    document.querySelectorAll('.nosotros__mision__text .lang').forEach(element => {
        let data_lang = element.getAttribute('data-lang');

        //si hay subsecciones entramos en ellas
        if (element.getAttribute("data-lang").substring(0, 3) == "sub") {
            element.textContent = json[lang]["nosotros"]["nosotros__mision"]["parrafo2"][data_lang];
        } else {
            element.textContent = json[lang]["nosotros"]["nosotros__mision"][data_lang];
        }

    });

    //Nosotros Editorial
    document.querySelectorAll('.nosotros__editorial__text .lang').forEach(element => {
        let data_lang = element.getAttribute('data-lang');

        //si hay subsecciones entramos en ellas
        if (element.getAttribute("data-lang").substring(0, 3) == "sub") {
            element.textContent = json[lang]["nosotros"]["nosotros__editorial"]["parrafo3"][data_lang];
        } else {
            element.textContent = json[lang]["nosotros"]["nosotros__editorial"][data_lang];
        }

    });


    //Nosotros Talleres
    document.querySelectorAll('.nosotros__talleres__text .lang').forEach(element => {
        let data_lang = element.getAttribute('data-lang');

        //si hay subsecciones entramos en ellas
        if (element.getAttribute("data-lang").substring(0, 3) == "sub") {
            element.textContent = json[lang]["nosotros"]["nosotros__talleres"]["parrafo2"][data_lang];
        } else {
            element.textContent = json[lang]["nosotros"]["nosotros__talleres"][data_lang];
        }

    });

    //colaboradores
    document.querySelectorAll('.nosotros__talleres__colaboradores .lang').forEach(element => {
        let data_lang = element.getAttribute('data-lang');

        //si hay subsecciones entramos en ellas

        element.textContent = json[lang]["nosotros"]["colaboradores"][data_lang];


    });

    /**
     * Formulario
     */

    if (document.querySelector('.registro__contenedor .registro__title')) {
        document.querySelector('.registro__contenedor .registro__title').textContent = json[lang]["formulario"]["title"];
        document.querySelectorAll('.registro__formulario .lang').forEach(elemento => {
            let data_lang = elemento.getAttribute('data-lang');
            //Si es un select
            if (elemento.querySelector('select')) {
                elemento.querySelector('label').textContent = json[lang]["formulario"]["genero"]["title"];
                elemento.querySelector('select').querySelectorAll('option').forEach(option => {
                    data_lang=option.getAttribute('data-lang')
                    option.textContent = json[lang]["formulario"]["genero"][data_lang];
                });


            }
            //Si es el botón
            else if (elemento.querySelector('input').getAttribute('type') == "submit") {
                elemento.querySelector('input').value = json[lang]["formulario"][data_lang];
            }
            //Para el resto de input
            else {
                elemento.querySelector('label').textContent = json[lang]["formulario"][data_lang];
                elemento.querySelector('input').setAttribute("placeholder", json[lang]["formulario"][data_lang]);
            }
        });
    }


    /**
     * Footer
     */
    document.querySelectorAll('.footer .lang').forEach(element => {

        let data_lang = element.getAttribute('data-lang');

        switch (element.parentElement.classList.value) {
            case "footer__ayuda":
                element.textContent = json[lang]["Footer"]["ayuda"][data_lang]
                break;
            case "footer__nosotros":
                element.textContent = json[lang]["Footer"]["Contacto"]["title"]
                break;
            case "footer__redes":
                element.textContent = json[lang]["Footer"]["Redes Sociales"]["title"]
                break;
            default:
                element.textContent = "";
                break;
        }
    });
}