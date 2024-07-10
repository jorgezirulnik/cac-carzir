import { CARZIR_BACKEND } from './config.js';

document.getElementById('autoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const autoId = document.getElementById('autoId').value; // Obtener el ID del auto (si está en modo edición)
  const nombre = document.getElementById('nombre').value;
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const dominio = document.getElementById('dominio').value;
  // const foto = document.getElementById('foto').files[0];

  // console.log("Datos del producto:", { autoId, nombre, marca, modelo, dominio, foto });
  // console.log("FOTO", foto, "TIPO: ", typeof(foto));

  let formData = new FormData();
  formData.append('autoId', autoId);
  formData.append('nombre', nombre);
  formData.append('marca', marca);
  formData.append('modelo', modelo);
  formData.append('dominio', dominio);
  // formData.append('foto', foto);

  let url = `${CARZIR_BACKEND}/autos`;
  let method = 'POST';

  if (autoId) {
    // Si hay un ID de autos, estamos en modo edición
    url += `/${autoId}`;
    method = 'PUT'; // Usar el método PUT para actualizar el auto existente
  }

  fetch(url, {
    method: method,
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').innerText = data.message;
      loadAutos(); // Recarga la lista de autos después de agregar uno nuevo
      clearForm(); // Limpiar el formulario después de guardar cambios
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
      const autoList = document.getElementById('autoList');
      autoList.innerHTML = ''; // Limpiar la lista existente

      data.forEach(auto => {
        const autoItem = document.createElement('li');
        autoItem.innerHTML = `
          <span>Nombre: ${auto.nombre} Modelo: ${auto.modelo} Dominio: ${auto.dominio}</span>
          <div>
            <button onclick="editAuto(${auto.id})">Editar</button>
            <button onclick="deleteAuto(${auto.id})">Borrar</button>
          </div>
        `;
        // <img src="${CARZIR_BACKEND}/static/img/${auto.foto}" width="150" alt="" class="auto-item-img">
        
        autoList.appendChild(autoItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar los autos:', error);
    });
}

window.editAuto = (autoId) => {
    fetch(`${CARZIR_BACKEND}/autos/${autoId}`)
      .then(response => response.json())
      .then(auto => {
        // Llenar el formulario con los datos del vehículo
        document.getElementById('autoId').value = autoId;
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
  
window.deleteAuto = (autoId) => {
  fetch(`${CARZIR_BACKEND}/autos/${autoId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').innerText = data.message;
      loadAutos(); // Recarga la lista de autos después de borrar uno
    })
    .catch(error => {
      console.error('Error al borrar el vehículo:', error);
    });
};

const clearForm = () => {
  document.getElementById('autoId').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('dominio').value = '';

  document.querySelector('button[type="submit"]').innerText = 'Agregar Auto';
};

document.getElementById('cancelEdit').addEventListener('click', clearForm);
document.addEventListener('DOMContentLoaded', loadAutos);
