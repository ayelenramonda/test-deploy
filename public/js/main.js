const socket = io();

// Conectamos el cliente y escuchamos el evento messages
socket.on('messages', (data) => {
	render(data);
});

// Conectamos el cliente y escuchamos el evento producList
// socket.on('productoMostrar', (data) => {
// 	renderItem(data);
// });

let start = new Date();
let now = start.toLocaleString();

// Funciones mensajes
function render(data) {
	const html = data
		.map((elemento) => {
			// Obtiene el valor del objeto donde se asigna el autor y el texto
			return `<div style="display:flex; flex-direction: column;">
       	<div class="infoCliente">${elemento.author} - ${now}</div>
		</div>		
        <p class="mensajeCliente">${elemento.text}</p>`;
		})
		.join(' '); // Acá separa por espacios el chat

	document.getElementById('mensajes').innerHTML = html; // Obtenemos el objeto mensajes
}
// El objeto message en index.js se encuentra vacío, pero esta función le agrega los parámetros al objeto y crea tanto el author como el text.

function addMessage(e) {
	const mensaje = {
		author: document.getElementById('mail').value,
		text: document.getElementById('texto').value
	};

	document.getElementsByClassName('mensaje')[1].value = '';

	socket.emit('new-message', mensaje);
	console.log(mensaje);

	//return false;
}
// const form = document.querySelector('#form');
// form.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	console.log(form['email'].value, form['texto'].value);
// });

// Productos

// function renderItem(data) {
// 	const html = data
// 		.map((e) => {
// 			return `
//                 <tr>
//                 <td>${e.producto}</td>
//                 <td>${e.price}</td>
//                 <td><img width=50 src='${e.thumbnail}' alt="imgProducto"></td>
//                 </tr> `;
// 		})
// 		.join('\n');
// 	document.getElementById('idTbody').innerHTML = html;
// }
// function addItem() {
// 	const producto = {
// 		producto: document.getElementById('productos').value,
// 		price: document.getElementById('price').value,
// 		thumbnail: document.getElementById('thumbnail').value
// 	};

// 	socket.emit('newProduct', producto);
// }
