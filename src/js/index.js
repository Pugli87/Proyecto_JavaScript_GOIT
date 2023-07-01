import eventsApi from '../js/eventsApi';
// hago una referencia al elemento del formulario y al campo de entrada
const form = document.getElementById('search-form');
//const input = form.querySelector('input');
const startBtn = document.getElementById('start-btn');
const chooseBtn = document.getElementById('choose-btn');
const chooseInput = document.getElementById('choose'); //eliminar contenido
const searchInput = document.getElementById('search'); //eliminar contenido

let data = [];

const countryCode = document.querySelector('#choose').value; // Código del país que deseas buscar
let currentPage = 0;

/* --------------------------------------------------------------------------------------*/
/* --- En esta parte se hace el primer cargado de elementos para mostar en la pagina ----*/
/* --------------------------------------------------------------------------------------*/
function LoadRandom() {
  eventsApi
    .getRandom()
    .then(result => {
      const data = result._embedded.events;
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = ''; // Limpia el contenido existente antes de agregar los nuevos elementos
      data.forEach(item => {
        const imageUrl =
          item.images && item.images[4] && item.images[4].url
            ? item.images[4].url
            : '';
        const venueCity =
          item._embedded &&
          item._embedded.venues &&
          item._embedded.venues[0] &&
          item._embedded.venues[0].city
            ? item._embedded.venues[0].city.name
            : '';
        const listItem = document.createElement('li');
        listItem.classList.add('gallery__item');
        listItem.innerHTML = `
        <a href="" class="gallery__link">
          <img class="gallery__img" src="${imageUrl}" alt=""> <br/>
        </a>
        <span class="gallery__name">${item.name}</span> <br/>
        <span class="gallery__date">${item.dates.start.localDate}</span> <br/>
        <span class="gallery__city">
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 0C1.34581 0 0 1.40339 0 3.12836C0 5.29645 3.00295 9 3.00295 9C3.00295 9 6 5.18983 6 3.12836C6 1.40339 4.65424 0 3 0ZM3.90516 4.04434C3.65558 4.30455 3.32781 4.43469 3 4.43469C2.67224 4.43469 2.34437 4.30455 2.09489 4.04434C1.59577 3.52392 1.59577 2.67709 2.09489 2.15662C2.33658 1.90448 2.65807 1.76561 3 1.76561C3.34193 1.76561 3.66337 1.90453 3.90516 2.15662C4.40428 2.67709 4.40428 3.52392 3.90516 4.04434Z" fill="white"/>
          </svg>
          ${venueCity}
        </span> <br/>
      `;
        gallery.appendChild(listItem);
      });
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}
LoadRandom(currentPage);

/* --------------------------------------------------------------------------------------*/
/*--- aca cargamos data o elementos desde el boton buscar con una palab ra de busqueda --*/
/* --------------------------------------------------------------------------------------*/

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

/* --------------------------------------------------------------------------------------*/
/* -------------------le hago pruebas a eventos llamdos por country ---------------------*/
/* --------------------------------------------------------------------------------------*/

function loadCountry(countryCode) {
  document.getElementById('gallery').innerHTML = '';
  eventsApi
    .getByCountry(countryCode)
    .then(result => {
      /*  result;
      console.log(result._embedded.events);
      data = result._embedded.events;(modif. para mostrar no eventons en tu area) */
      if (result._embedded && result._embedded.events.length > 0) {
        const data = result._embedded.events;
        data.map(item => {
          document.getElementById('gallery').innerHTML += `
        <li class="gallery__item">
          <img class="gallery__img" src="${item.images[4].url}"> <br/>
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
      } else {
        alert('No hay eventos en tu área.');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
/* validacion */
function validaForm() {
  const chooseValue = chooseInput.value;
  const searchValue = searchInput.value;

  if (chooseValue.trim() === '' || searchValue.trim() === '') {
    alert('Por favor, completa todos los campos del formulario.');
    return false;
  }

  return true;
}

chooseBtn.addEventListener('click', () => {
  if (validaForm()) {
    const chooseValue = chooseInput.value;
    loadCountry(chooseValue);
    chooseInput.value = ''; // eliminar contenido
  }
});
startBtn.addEventListener('click', event => {
  if (validaForm()) {
    const searchValue = searchInput.value;
    loadData(searchValue);
    searchInput.value = ''; //eliminar contenido
  }
});
