// Listado de vehículos
// const CARZIR_BACKEND = "http://127.0.0.1:5000/autos";
import { CARZIR_BACKEND } from "./config.js";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTI2ZDgzMDU2NjMzNmJhNmU4Mzc2NGIyZjZiZmI2MSIsInN1YiI6IjY1Y2U2NDA0MTNhMzg4MDE4NzlmNjBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZTxSjr1fLqIi2LSwadmPT37grY2IF6y3d4LUHLbEmE'
    }
}

const obtenerAutos = async () => {

    const resultado = await fetch(`${CARZIR_BACKEND}/autos`, options)
    const data = await resultado.json()

    const autos = data
    //console.log(autos)
    // Seleccionar el contenedor donde se mostrarán los autos
    let divAutosGaleria = document.querySelector('#contenedorAutos')

    // Iterar sobre cada auto y crear su elemento HTML
    for (let i = 0; i < autos.length; i++) {
        // Crear el HTML para el auto actual

        const AutoAInsertar =`
        <div class="auto-item">
                <img src="${CARZIR_BACKEND}/static/img/${autos[i].foto}" width="250" alt="" class="auto-item-img">
                <div class="auto-item-detail">
                    <p class="auto-item-detail-nombre">${autos[i].nombre}</p>
                    <p class="auto-item-detail-marca">${autos[i].marca}</p>
                    <p class="auto-item-detail-marca">${autos[i].dominio}</p>
                    <p class="auto-item-detail-marca">${autos[i].id}</p>
                </div>
        </div>
        
        `

        // Insertar el HTML de la película en el contenedor
        divAutosGaleria.insertAdjacentHTML('beforeend', AutoAInsertar)
    }
    if (autos.length === 0) {
        divAutosGaleria.insertAdjacentHTML('beforeend', "<p>No hay vehículos en el sistema 😮</p>")
    }
}

obtenerAutos()

