import { CARZIR_BACKEND } from './config.js';

document.getElementById('autoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const autoId = document.getElementById('autoId').value; // Otener el ID del producto (si esta en modo edición)
  const nombre = document.getElementById('nombre').value;
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const dominio = document.getElementById('dominio').value;
  const foto = document.getElementById('foto').files[0];

  // console.log("Datos del producto:", {autoId, nombre, marca, modelo, dominio, foto});
  // console.log("FOTO", foto, "TIPO: ", typeof(foto));

  let formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('marca', marca);
  formData.append('modelo', modelo);
  formData.append('dominio', dominio);
  formData.append('foto', foto);

  let url = `${CARZIR_BACKEND}/autos`;
  let method = 'POST';

  if (autoId) {
    // Si hay un ID de producto, es un método de edición
    url += `/${autoId}`;
    method = 'PUT'; // Usar el método PUT para actualizar el producto existente
  }

  fetch(url, {
    method: method,
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadAutos(); // Recarga la lista de productos despues de agregar uno
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al agregar el vehículo.';
    console.error('Error:', error);
  });
});

function loadAutos() {
  fetch(`${CARZIR_BACKEND}/autos`)
  .then(response => response.json())
  .then(data => {
    const autosList = document.getElementById('autoList');
    autosList.innerHTML = ''; // Limpia la lista de productos

    data.forEach(auto => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${auto.nombre} ${auto.marca} ${auto.autoId}</span>
        <div>
          <button onclick="editProduct(${auto.autoId})">Editar</button>
          <button onclick="deleteProduct(${auto.autoId})">Eliminar</button>
        </div>
      `;

      // <h3>${product.nombre_prod}</h3>
      // <p>Precio: $${product.precio_prod}</p>
      // <p>Stock: ${product.stock_prod}</p>
      // <p>Descripción: ${product.descripcion_p}</p>
      // <img src="${BAKERY_BACKEND}/static/img/${product.img_url}" alt="${product.nombre_prod}">

      autosList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error al cargar los vahículos: ', error);
  });
}

window.deleteAuto = function(id) {
  fetch(`${CARZIR_BACKEND}/autos/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
    loadAutos(); // Recarga la lista de vehículo despues de borrar uno
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error al borrar el vehículo.';
    console.error('Error:', error);
  });
};

// Usar función flecha para editar el producto y asignarlo al objecto window
window.editProduct = function(id) {
  // Obtener el producto por su ID y cargar los datos en el formulario
  fetch(`${CARZIR_BACKEND}/autos/${id}`)
  .then(response => response.json())
  .then(auto => {
    // llenar el formulario con los datos del producto
    document.getElementById('autoId').value = auto.autoId;
    document.getElementById('nombre').value = auto.nombre;
    document.getElementById('marca').value = auto.marca;  
    document.getElementById('modelo').value = auto.modelo;
    document.getElementById('dominio').value = auto.dominio;

    document.getElementById('btnsave').innerText = 'Guardar Cambios';
  })
  .catch(error => {
    console.error('Error al obtener el vehículo para editar:', error);
  });
};

// Función para limpiar el formulario despues de guardar cambios o cancelar
const clearForm = () => {
  document.getElementById('autoId').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('dominio').value = '';

  // Restaurar el texto original del botón submit
  document.querySelector('btnsave').value = 'Agregar Vehículo';
};

// Cancelar la edición y limpiar el formulario al hacer clic en el botón Cancelar
document.getElementById('cancelEdit').addEventListener('click', clearForm);

// Cargar los productos cuando la página se cargue por primera vez
document.addEventListener('DOMContentLoaded', loadProducts);
