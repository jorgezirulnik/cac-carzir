import { CARZIR_BACKEND } from './config.js';

document.getElementById('autoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const autoId = document.getElementById('autoId').value; // Obtener el ID del auto (si está en modo edición)
  const nombre = document.getElementById('nombre').value;
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const dominio = document.getElementById('dominio').value;
  const foto = document.getElementById('foto').files[0];

  let formData = new FormData();
  formData.append('autoId',autoId);
  formData.append('nombre',nombre);
  formData.append('marca', marca);
  formData.append('modelo', modelo);
  formData.append('dominio', dominio);
  formData.append('foto', foto);

  let url = `${CARZIR_BACKEND}/autos`;
  let method = 'POST';

  if (autoId) {
    // Si hay un ID de autos, estamos en modo edición
    url += `/${autoId}`;
    method = 'PUT'; // Usar el método PUT para actualizar la película existente
  }

  fetch(url, {
    method: method,
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadAutos(); // Recarga la lista de autos después de agregar uno nuevo
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al agregar el vehículo.';
    console.error('Error:', error);
  });
});

function loadAutos() {

  fetch(`${CARZIR_BACKEND}/autos`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const autosList = document.getElementById('autoList');

      autosList.innerHTML = ''; // Limpiar la lista existente

      data.forEach(auto => {
        const autoItem = document.createElement('li');
        autoItem.innerHTML = `
          <img src="${CARZIR_BACKEND}/static/img/${auto.foto}" width="150" alt="" class="auto-item-img">
          <span>${auto.nombre} ${auto.modelo} ${auto.dominio} ${auto.autoId} </span>
          <div>
            <button onclick="editAuto(${auto.autoId})">Editar</button>
            <button onclick="deleteAuto(${auto.autoId})">Borrar</button>
          </div>
        `;
        autosList.appendChild(autoItem);

      });
    })
    .catch(error => {
      console.error('Error al cargar los autos:', error);
    });
}

const obtenerAutos = async () => {

  //console.log(autos)
  // Seleccionar el contenedor donde se mostrarán los autos
  let divAutosGaleria = document.querySelector('#contenedorAutos')

  // Iterar sobre cada auto y crear su elemento HTML
  for (let i = 0; i < autos.length; i++) {
      // Crear el HTML para el auto actual

      const AutoAInsertar =`
      <div class="auto-item">
              <img src="${CARZIR_BACKEND}/static/img/${autos[i].foto}" width="200" alt="" class="auto-item-img">
              <div class="auto-item-detail">
                  <p class="auto-item-detail-nombre">${autos[i].nombre}</p>
                  <p class="auto-item-detail-marca">${autos[i].marca}</p>
                  <p class="auto-item-detail-marca">${autos[i].dominio}</p>
                  <p class="auto-item-detail-marca">${autos[i].autoId}</p>
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

window.deleteAuto = function(autoId) {
  fetch(`${CARZIR_BACKEND}/autos/${autoId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadProducts(); // Recarga la lista de productos despues de borrar uno
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al borrar el producto.';
    console.error('Error:', error);
  });
};



// Usar función flecha para editar el vehículo y asignarlo al objeto window
window.editAuto = (autoId) => {
  // Obtener el vehículo por su ID y cargar los datos en el formulario
  fetch(`${CARZIR_BACKEND}/autos/${autoId}`)
    .then(response => response.json())
    .then(auto => {
      // Llenar el formulario con los datos del vehículo
      // document.getElementById('autoId').value = auto.autoId;
      document.getElementById('nombre').value = auto.nombre;
      document.getElementById('marca').value = auto.marca;      
      document.getElementById('modelo').value = auto.modelo;
      document.getElementById('dominio').value = auto.dominio;
      document.getElementById('btnSave').innerText = 'Guardar Cambios';
    })
    .catch(error => {
      console.error('Error al obtener el vehículo para editar:', error);
    });
};

// Función para limpiar el formulario después de guardar cambios o cancelar
const clearForm = () => {
  document.getElementById('autoId').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('dominio').value = '';
  document.getElementById('foto').value = '';

  // Restaurar el texto original del botón de submit
  document.querySelector('button[type="submit"]').innerText = 'Agregar Auto';
};

// Cancelar la edición y limpiar el formulario al hacer clic en "Cancelar"
document.getElementById('cancelEdit').addEventListener('click', clearForm);

// Cargar los vehículos cuando la página se cargue por primera vez
document.addEventListener('DOMContentLoaded', loadAutos);
