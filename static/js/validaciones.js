function validarFormularioContacto() {
    var select = document.getElementById('userMarcas');
    var valorSeleccionado = select.value;

    if (valorSeleccionado === 'NONE') {
        alert('Por favor, selecciona una marca.');
        return false; // Evita que el formulario se envíe
    }

    return true; // Permite que el formulario se envíe
}

function validarFigureTurnos() {

    //Verificar que la fecha ingresada sea mayor o igual a la actual.
    var fechaInput = document.getElementById("fechaTurno").value;
    var fechaSeleccionada = new Date(fechaInput);
    var fechaActual = new Date();
    
    // Obtener la fecha actual sin la parte de la hora
    var fechaActualSinHora = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
    
    // Verificar si la fecha seleccionada es menor que la fecha actual
    if (fechaSeleccionada < fechaActualSinHora) {
        alert("La fecha seleccionada no puede ser menor que la fecha actual.");
        return false; // Evita que el formulario se envíe
    }
    
    var select = document.getElementById("Marca_auto");
    
    // Verificar si se ha seleccionado una opción en el select
    if (select.value === "NONE") {
        alert("Debes seleccionar una marca.");
        return false; // Evita que el formulario se envíe
    }

    var checkbox = document.getElementById("Acepto");

    // Verificar si el checkbox está marcado
    if (!checkbox.checked) {
        alert("Debes aceptar los términos y condiciones.");
        return false; // Evita que el formulario se envíe
    }

    return true; // Permite que el formulario se envíe
}


function validarInicioSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === '') {
        alert('Por favor, ingrese su usuario.');
        return false;
    }

    if (password.trim() === '') {
        alert('Por favor, ingrese su contraseña.');
        return false;
    }

    if (password.length < 5) {
        alert('La contraseña debe tener al menos 5 caracteres.');
        return false;
    }

    // Aquí podrías agregar más validaciones si es necesario

    // Si todas las validaciones pasan, se puede enviar el formulario
    return true;
}