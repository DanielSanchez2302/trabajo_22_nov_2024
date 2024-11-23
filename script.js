const API_URL = 'https://jsonplaceholder.typicode.com';

// DOM Elements
const userList = document.getElementById('user-list');
const photoGallery = document.getElementById('photo-gallery');
const userForm = document.getElementById('user-form');

// User Data Storage
let users = [];

// Fetch and Validate Data
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

// Render Users and Posts
function renderUsers() {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <button onclick="editUser(${index})">Editar</button>
            <button onclick="deleteUser(${index})">Eliminar</button>
        `;
        userList.appendChild(userCard);
    });

    console.log('Usuarios actuales:', users);
}



// Add New User
userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect and Validate Data
    const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();

    if (!name || !username || !email || !phone || !company) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Create New User
    const newUser = {
        id: users.length + 1,
        name,
        username,
        email,
        phone,
        company: { name: company },
    };

    users.push(newUser);
    renderUsers();
    userForm.reset();
});

// Edit User
function editUser(index) {
    const user = users[index];
    const name = prompt('Nombre:', user.name);
    const username = prompt('Nombre de Usuario:', user.username);
    const email = prompt('Email:', user.email);
    const phone = prompt('Teléfono:', user.phone);
    const company = prompt('Compañía:', user.company.name);

    // Update User Data
    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (company) user.company.name = company;

    renderUsers();
}

// Delete User
function deleteUser(index) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
        users.splice(index, 1);
        renderUsers();
    }
}

// Initialize App
async function init() {
    const fetchedUsers = await fetchData('users');
    users = fetchedUsers.slice(0, 10).map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        company: { name: user.company.name },
    }));

    renderUsers();
}

init();


/* EXPLICACION:
1. Constantes y Variables Iniciales
const API_URL = 'https://jsonplaceholder.typicode.com';
API_URL: Define la URL base para realizar las peticiones a la API JSONPlaceholder, que es un servicio que simula datos para pruebas.

2. const userList = document.getElementById('user-list');
const photoGallery = document.getElementById('photo-gallery');
const userForm = document.getElementById('user-form');
userList: Obtiene el contenedor del DOM donde se renderizarán los usuarios.
photoGallery: Obtiene el contenedor del DOM para la galería de fotos (aunque no se utiliza explícitamente en el código dado).
userForm: Obtiene el formulario del DOM para añadir nuevos usuarios.

3.let users = [];
users: Almacena localmente la lista de usuarios obtenidos de la API o creados manualmente.

4.Función para Obtener Datos de la API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);
fetchData: Función asíncrona para obtener datos desde un endpoint específico de la API.
fetch: Realiza la petición HTTP a la URL formada concatenando API_URL con el endpoint recibido como parámetro.

5. if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
response.ok: Verifica si la respuesta HTTP fue exitosa (código 200-299). Si no, lanza un error.

6. const data = await response.json();
        return data;
response.json(): Convierte la respuesta de la API en un objeto o arreglo JSON.
return data: Devuelve los datos obtenidos.

7. } catch (error) {
        console.error(error.message);
        return [];
    }
}
catch: Captura errores en la petición o en el procesamiento de la respuesta. Muestra el error en la consola y devuelve un arreglo vacío como fallback.

8. Renderización de Usuarios
function renderUsers() {
    userList.innerHTML = '';
renderUsers: Limpia el contenedor de usuarios antes de renderizar los actuales.

9. users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
users.forEach: Itera sobre cada usuario en el arreglo users.
userCard: Crea un elemento div para cada usuario y le asigna la clase user-card.

10. userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <button onclick="editUser(${index})">Editar</button>
            <button onclick="deleteUser(${index})">Eliminar</button>
        `;
innerHTML: Inserta un bloque de HTML en cada tarjeta, mostrando el nombre y el email del usuario, además de botones para editar y eliminar.
onclick: Asocia las funciones editUser y deleteUser al clic de los botones, pasando el índice del usuario como parámetro.

11. userList.appendChild(userCard);
    });
appendChild: Agrega la tarjeta del usuario al contenedor userList.

12. console.log('Usuarios actuales:', users);
console.log: Muestra en la consola del navegador la lista actualizada de usuarios.

13. Agregar Nuevo Usuario
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
addEventListener: Escucha el evento submit del formulario userForm.
e.preventDefault: Previene el comportamiento predeterminado del formulario (recargar la página).

14. const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();
Obtiene los valores de los campos del formulario y elimina espacios en blanco adicionales con trim.

15. if (!name || !username || !email || !phone || !company) {
        alert('Por favor, completa todos los campos');
        return;
    }
Valida que todos los campos estén completos. Si falta alguno, muestra un mensaje de alerta y detiene el proceso.

16. const newUser = {
        id: users.length + 1,
        name,
        username,
        email,
        phone,
        company: { name: company },
    };
Crea un nuevo objeto newUser con los datos ingresados, asignándole un ID único basado en el tamaño del arreglo users.

17. users.push(newUser);
    renderUsers();
    userForm.reset();
Agrega el nuevo usuario al arreglo users, actualiza la interfaz con renderUsers y reinicia los campos del formulario.

18. Editar Usuario
function editUser(index) {
    const user = users[index];
    const name = prompt('Nombre:', user.name);
    const username = prompt('Nombre de Usuario:', user.username);
    const email = prompt('Email:', user.email);
    const phone = prompt('Teléfono:', user.phone);
    const company = prompt('Compañía:', user.company.name);
editUser: Abre cuadros de diálogo prompt para editar los campos del usuario seleccionado (identificado por el índice).

19. if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (company) user.company.name = company;
Actualiza los datos del usuario solo si el valor ingresado no está vacío.

20. renderUsers();
}
Llama a renderUsers para reflejar los cambios en la interfaz.

21. Eliminar Usuario
function deleteUser(index) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
        users.splice(index, 1);
        renderUsers();
    }
}
deleteUser: Muestra un cuadro de confirmación para eliminar al usuario seleccionado. Si el usuario confirma, elimina el usuario del arreglo users con splice y actualiza la interfaz

22. Inicialización de la App
async function init() {
    const fetchedUsers = await fetchData('users');
init: Función principal que inicializa la aplicación. Obtiene los usuarios de la API.

23.  users = fetchedUsers.slice(0, 10).map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        company: { name: user.company.name },
    }));
slice(0, 10): Limita los usuarios a los primeros 10.
map: Crea un nuevo arreglo con los campos relevantes de cada usuario, estructurándolos de forma más sencilla.

24. renderUsers();
}
Renderiza los usuarios obtenidos.

25. init();
Llama a la función init para iniciar la aplicación al cargar el script.*/