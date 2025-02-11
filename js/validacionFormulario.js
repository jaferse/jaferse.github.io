function updateProgress(value, total) {
    const circle = document.querySelector('.circle-progress');
    const text = document.querySelector('.progress-text');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // Calcula el desplazamiento del círculo
    const offset = circumference - (value / total) * circumference;

    // Update the progress circle and the text
    circle.style.strokeDashoffset = offset;
    text.textContent = `${value}/${total}`;
}


const justValidate = new JustValidate('.registro__formulario');
const formulario = document.querySelector('.registro__formulario');
console.log(formulario);

let contador = 0;
//Inicializo información de progreso
updateProgress(0, (formulario.elements.length - 1));

for (const element of formulario.elements) {

    if (element.type !== 'submit') {
        console.log(element);

        element.addEventListener("blur", () => {

            justValidate.revalidateField(`#${element.id}`);
            if (element.id === "apellido2" && element.value === "") {
                //hacemos una pausa para que pueda aceder al elemento creado
                setTimeout(() => {
                    //Ocultamos mensaje
                    element.nextElementSibling.style.visibility = "hidden";
                }, 1)
                // console.log(element.previousElementSibling);

            }
            const claseVerificacion = document.querySelectorAll('.just-validate-success-field');

            console.log(claseVerificacion.length);

            updateProgress(claseVerificacion.length, (formulario.elements.length - 1))
            console.log(contador);

        });
        element.addEventListener("input", () => {

            justValidate.revalidateField(`#${element.id}`);
        });

    }
}


justValidate.addField('#userName',
    [
        {
            rule: 'required',
            errorMessage: 'El nombre debe ser rellenado'
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Al menos debe de contener 3 caracteres'
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'No puede superar los 30 caracteres'
        },
        {
            rule: 'customRegexp',
            value: /^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~]+$/,
            errorMessage: 'El nombre de usuario solo puede tener carácteres con mayúsculas, minúsculas, dígitos y estos carácteres especiales: ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~'
        },

    ],
    {
        successMessage: 'Nombre usuario valido',

    }

).addField('#nombre',
    [
        {
            rule: 'required',
            errorMessage: 'El nombre debe ser rellenado'

        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Al menos debe de contener 3 caracteres'
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'No puede superar los 30 caracteres'
        },
        {
            rule: 'customRegexp',
            value: /^[\p{L}\s]+$/u,

            errorMessage: 'El nombre solo puede tener carácteres con mayúsculas, minúsculas y espacios'
        },
    ],
    {
        successMessage: 'Nombre valido',
    }
).addField('#apellido1',
    [
        {
            rule: 'required',
            errorMessage: 'El primer apellido debe ser rellenado'

        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Al menos debe de contener 3 caracteres'
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'No puede superar los 30 caracteres'
        },
        {
            rule: 'customRegexp',
            value: /^[\p{L}\s]+$/u,

            errorMessage: 'El Apellido solo puede tener carácteres con mayúsculas, minúsculas y espacios'
        },
    ],
    {
        successMessage: 'Primer apellido valido',
    }
).addField('#apellido2',
    [
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Al menos debe de contener 3 caracteres'
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'No puede superar los 30 caracteres'
        },
        {
            rule: 'customRegexp',
            value: /^[\p{L}\s]+$/u,

            errorMessage: 'El Apellido solo puede tener carácteres con mayúsculas, minúsculas y espacios'
        }
    ],
    {
        successMessage: "Segundo apellido válido",
    }

).addField('#email',
    [
        {
            rule: 'required',
            errorMessage: 'El correo debe ser rellenado'

        },
        {
            rule: 'maxLength',
            value: 320,
            errorMessage: 'No puede superar los 320 caracteres'
        },
        {
            rule: 'customRegexp',
            value: /^[A-Za-z0-9_.+]{2,}@[A-Za-z0-9]{2,}\.[a-z]{2,5}$/,

            errorMessage: 'El correo debe de tener formato: nombre@dominio.com'
        },
    ],
    {
        successMessage: 'Correo valido',
    }

).addField('#password',
    [
        {
            rule: 'required',
            errorMessage: 'La contraseña debe ser rellenada'

        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Al menos debe de contener 6 caracteres'
        },
        {
            rule: 'maxLength',
            value: 50,
            errorMessage: 'No puede superar los 50 caracteres'
        },
        {
            rule: 'customRegexp',
            value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[._+]).{6,}$/,

            errorMessage: 'La contraseña debe de tener una longitud minima de 6 caracteres e incluir al menos una mayuscula, minuscula numero y caracter especial . _ +',
        },
    ],
    {
        successMessage: 'Contraseña valida',
    }
).addField('#password2',
    [
        {
            rule: "required",
            errorMessage: "Debes confirmar la contraseña",
        },
        {
            validator: (value, fields) => {
                return value === fields['#password'].elem.value;
            },
            errorMessage:"Las contraseñas no coinciden",
        }
       


    ],
    {

        successMessage: 'Contraseña valida',
    }

).onSuccess((e) => { //En caso de que sea correcto cada uno de los campos envia el formulario
    // formulario.submit();
    // window.location.reload()
    // formulario.reset();
    e.preventDefault();
    formulario.submit();
});


formulario.addEventListener('submit', (e) => {

    //just-validate-success-label borrar todos

    e.preventDefault();

    justValidate.revalidate().then((isValid) => {
        if (isValid) {
            console.log("Formulario enviado correctamente.");
            // e.submit();
            formulario.submit();
        } else {
            console.log("Formulario no válido, corrige los errores.");
        }
    });


    const mensajesVerificacion = document.querySelectorAll('.just-validate-success-label');
    const claseVerificacion = document.querySelectorAll('.just-validate-success-field');
    //Borramos todos los textos de verificación
    mensajesVerificacion.forEach(mensaje => {
        mensaje.remove();
    });
    //Borramos todas las clases de verificacion de los texto
    claseVerificacion.forEach(clase => {
        clase.classList.remove('just-validate-success-field');

    });
});