// hago una referencia al elemento del formulario y al campo de entrada
const form = document.getElementById('search-form');
const input = form.querySelector('input');
const startBtn = document.getElementById('start-btn');
const chooseBtn = document.getElementById('choose-btn');

// evento de clic al botón start
startBtn.addEventListener('click', function () {
  // Aquí puedes colocar el código que deseas ejecutar cuando se haga clic en el botón
  console.log("Se hizo clic en el botón 'start-btn'");
});

// evento de clic al botón choose
chooseBtn.addEventListener('click', function () {
  console.log("se hizo click en el botón 'chooseBtn'");
});

//
form.addEventListener('submit', () => {
  console.log('click en form');
});

// Agrega un evento de escucha al campo de entrada
input.addEventListener('input', handleInputChange);

function handleInputChange(event) {
  const value = event.target.value;
  console.log('Valor del campo de entrada:', value);
}
/*====================================================================================*/
/*lo de arriba son pruebas de funcionacmiento de los botones*/
/*====================================================================================*/

import eventsApi from '../js/eventsApi';

eventsApi
  .getByKey('keyword') // en keyWord colocamos la palabra del evento q queremos buscar
  .then(result => {
    // Hacer algo con el resultado de la búsqueda
    console.log(result);
  })
  .catch(error => {
    // Manejar cualquier error que ocurra
    console.error(error);
  });

// --------------------------------------------------------------------------------------//

let data = [];
function loadData(keyword) {
  document.getElementById('gallery').innerHTML = '';
  eventsApi
    .getByKey(keyword)
    .then(result => {
      result;
      console.log(result._embedded.events);
      data = result._embedded.events;

      data.map(item => {
        document.getElementById('gallery').innerHTML += `
        <li class="gallery__item">
          <img class="gallery__img" src="${item.images[0].url}"> <br/>
          <span class="gallery__name">${item.name}</span> <br/>
          <span class="gallery__date">${item.dates.start.localDate}</span> <br/>
          <span class="gallery__city">
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 0C1.34581 0 0 1.40339 0 3.12836C0 5.29645 3.00295 9 3.00295 9C3.00295 9 6 5.18983 6 3.12836C6 1.40339 4.65424 0 3 0ZM3.90516 4.04434C3.65558 4.30455 3.32781 4.43469 3 4.43469C2.67224 4.43469 2.34437 4.30455 2.09489 4.04434C1.59577 3.52392 1.59577 2.67709 2.09489 2.15662C2.33658 1.90448 2.65807 1.76561 3 1.76561C3.34193 1.76561 3.66337 1.90453 3.90516 2.15662C4.40428 2.67709 4.40428 3.52392 3.90516 4.04434Z" fill="white"/>
        </svg>
          ${
            item._embedded &&
            item._embedded.venues &&
            item._embedded.venues[0] &&
            item._embedded.venues[0].city
              ? item._embedded.venues[0].city.name
              : null
          }
          </span> <br/>
        </li>
        `;
      });
    })
    .catch(error => {
      console.error(error);
    });
}

startBtn.addEventListener('click', event => {
  loadData(document.querySelector('#search').value);
  // const resultado = document.querySelector('.resultado');
  // resultado.textContent = `Te gusta el sabor ${event.target.value}`;
});
