const obtenerFecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const btnAgregarTarea = document.querySelector("#agregarTarea");
const elemento = document.querySelector('#elemento');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let list;
let id;

//Fecha Actual

const $fechaActual = new Date();
fecha.innerHTML = $fechaActual.toLocaleDateString('es-CO', { weekday: 'long', month: 'short', day: 'numeric' });


// Funcion para personalizar el autor de la tares
function emergente() {
  var mensaje;
  var opcion = prompt("Introduzca su nombre por favor:", "Lenin Mendoza");

  if (opcion == null || opcion == "") {
    mensaje = "Debes escribir un Nombre para identificarte";
    alert(mensaje)
    location.reload();
  }
  else {
    mensaje = opcion;
    document.getElementById("usuario").innerHTML = "Bienvenido " + mensaje;
  }
} emergente()

// Agregar tarea

function agregarTarea(tarea, id, realizado, eliminado) {

  if (eliminado) { return } // verificar si elminado es true

  const $realizado = realizado ? check : uncheck;

  const $rayar = realizado ? lineThrough : '';

  const elemento = `
  <li id="elemento">
                    <i class="far ${$realizado}" data="realizado" id="${id}"></i>
                    <p class="text ${$rayar}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                </li>
`
  lista.insertAdjacentHTML("beforeend", elemento)
}


btnAgregarTarea.addEventListener('click', () => {
  let tarea = input.value
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    list.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false
    });
  }
  input.value = ''
  id++;
  localStorage.setItem('listaAlmacenada', JSON.stringify(list));

});

// Agregar tarea presionando el btn ENTER

document.addEventListener("keyup", function (e) {
  let tarea = input.value
  if (e.key == 'Enter') {
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      list.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false
      });

    }
    input.value = ''
    id++;
    localStorage.setItem('listaAlmacenada', JSON.stringify(list));
  }
});

// Tarea Realizada 

function tareaRealizada(element) {
  element.classList.toggle(check)
  element.classList.toggle(uncheck)
  element.parentNode.querySelector('.text').classList.toggle(lineThrough)
  lsit[element.id].realizado = list[element.id].realizado ? false : true;
}

// Tarea Eliminada

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  list[element.id].eliminado = true

}

lista.addEventListener('click', function (event) {
  const element = event.target
  const elementData = element.attributes.data.value

  if (elementData == 'realizado') {
    tareaRealizada(element)
  }
  else if (elementData == 'eliminado') {
    tareaEliminada(element)
  }
  localStorage.setItem('listaAlmacenada', JSON.stringify(list));
});

// Aplicando al locarStorage

let data = localStorage.getItem('listaAlmacenada')
if (data) {
  list = JSON.parse(data)
  console.log(list)
  id = list.length
  cargarLista(list)
} else {
  list = [];
  id = 0;
}


function cargarLista(array) {
  array.forEach(function (item) {
    agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
  })
}