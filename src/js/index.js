import getEvents from './eventsApi';

/* notiflix */
import Notiflix from 'notiflix';
Notiflix.Notify.init();

// hago una referencia al elemento del formulario y al campo de entrada
const form = document.getElementById('search-form');
let chooseInput = document.getElementById('choose');
let searchInput = document.getElementById('search');

//document.querySelector('#choose').value;
let data = [];
let currentPage = 0;
let pagination = {};
let keyword = ''; // Variable global para almacenar la palabra clave de búsqueda
let countryCode; // Variable global para almacenar el pais para búsqueda
const paginationBox = document.getElementById('pages');
console.log(countryCode);

function validaForm() {
  const chooseValue = chooseInput.value;
  const searchValue = searchInput.value;

  if (chooseValue.trim() === '' && searchValue.trim() === '') {
    Notiflix.Notify.warning(
      'Por favor, completa alguno de los campos del formulario.'
    );
    return false;
  }

  return true;
}

/* ===================================================================================== */
/* -------------- Estas dos funciones son para la paginacion de la pagina -------------- */
/* ===================================================================================== */

function renderPagination() {
  if (pagination.totalPages !== undefined && pagination.totalElements > 0) {
    const maxButtons = 5; // Número máximo de botones de paginación a mostrar
    const totalPages = Math.min(pagination.totalPages, 50); // Establece un límite máximo de 50 páginas

    let startPage, endPage;

    if (totalPages <= maxButtons) {
      // Si el número de páginas es menor o igual al número máximo de botones
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(currentPage - 2, 1); // Establece la página inicial, máximo 2 páginas antes de la página actual
      endPage = Math.min(startPage + maxButtons - 1, totalPages); // Establece la página final, máximo el número de botones permitido o la última página disponible
    }

    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor antes de agregar los nuevos botones

    addPaginationButton('<');

    if (startPage > 1) {
      addPaginationButton('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      addPaginationButton(i);
    }

    if (endPage < totalPages) {
      addPaginationButton('...');
    }

    addPaginationButton('>');
  } else {
    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor si no hay eventos disponibles
  }
}

function addPaginationButton(pageNumber) {
  const page =
    pageNumber === '...'
      ? document.createElement('span')
      : document.createElement('button');
  page.textContent = pageNumber;

  if (pageNumber === '<') {
    page.setAttribute('data-page', 'prev');
  } else if (pageNumber === '>') {
    page.setAttribute('data-page', 'next');
  } else {
    page.setAttribute('data-page', pageNumber);
  }

  if (page.textContent !== '...') {
    page.addEventListener('click', event => {
      const selectedPage = event.target.getAttribute('data-page');

      if (selectedPage === 'prev') {
        currentPage = 0;
      } else if (selectedPage === 'next') {
        currentPage = pagination.totalPages;
        if (currentPage >= Math.min(pagination.totalPages, 50) - 1) {
          currentPage = Math.min(pagination.totalPages, 50) - 1;
          page.disabled = true; // Deshabilita el botón "Siguiente" al alcanzar la última página
        }
      } else {
        currentPage = parseInt(selectedPage) - 1;
      }

      renderPagination();
      window.scrollTo(0, 0);
      console.log(`Botón ${selectedPage} seleccionado`);
      keyword = document.querySelector('#search').value;
      countryCode = chooseInput.value;

      if (!searchInput.value && !chooseInput.value) {
        loadData('US', currentPage);
      }
      if (searchInput.value && !chooseInput.value) {
        loadData(keyword, currentPage);
      }
      if (!searchInput.value && chooseInput.value) {
        loadCountry(countryCode, currentPage);
      }
      if (searchInput.value && chooseInput.value) {
        loadEvents(keyword, countryCode, currentPage);
      }
    });
  } else {
    page.classList.add('footer__spam');
  }

  if (currentPage === pageNumber - 1) {
    page.classList.add('active');
  }

  if (pageNumber === '<' && currentPage === 0) {
    page.disabled = true;
  }

  // Deshabilitar el botón "Siguiente" cuando se alcanza la última página
  if (
    pageNumber === '>' &&
    currentPage >= Math.min(pagination.totalPages, 50) - 1
  ) {
    page.disabled = true;
  }

  paginationBox.appendChild(page);
  page.classList.add('footer__page');
}

/* ===================================================================================== */
/* ===================== funcion para dibujar el html en la pagina ===================== */
/* ===================================================================================== */

function renderEvents(item) {
  const imageUrl = item?.images.filter(item => item.width > 600)[0].url;
  const venueCity =
    item._embedded &&
    item._embedded.venues &&
    item._embedded.venues[0] &&
    item._embedded.venues[0].city
      ? item._embedded.venues[0].city.name
      : '';
  const eventName = item.name.split('-')[0].trim(); // Obtener la primera parte del nombre hasta el guion "-"
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');
  listItem.innerHTML = `
    <a href="#" class="gallery__link">
      <img class="gallery__img" src="${imageUrl}" alt=""> 
    </a>
    <span class="gallery__name">${eventName}</span> <br/>
    <span class="gallery__date">${item.dates.start.localDate}</span> <br/>
    <span class="gallery__city">
      <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 0C1.34581 0 0 1.40339 0 3.12836C0 5.29645 3.00295 9 3.00295 9C3.00295 9 6 5.18983 6 3.12836C6 1.40339 4.65424 0 3 0ZM3.90516 4.04434C3.65558 4.30455 3.32781 4.43469 3 4.43469C2.67224 4.43469 2.34437 4.30455 2.09489 4.04434C1.59577 3.52392 1.59577 2.67709 2.09489 2.15662C2.33658 1.90448 2.65807 1.76561 3 1.76561C3.34193 1.76561 3.66337 1.90453 3.90516 2.15662C4.40428 2.67709 4.40428 3.52392 3.90516 4.04434Z" fill="white"/>
      </svg>
      ${venueCity}
    </span> <br/>
  `;
  return listItem;
}

/* ======================================================================================*/
/*--- aca cargamos data o elementos desde el boton buscar con una palab ra de busqueda --*/
/* ======================================================================================*/

function loadData(keyword, currentPage) {
  document.getElementById('gallery').innerHTML = '';
  getEvents(currentPage, { keyword })
    .then(result => {
      if (result.page.totalElements) {
        data = result._embedded.events;
        data.forEach(item => {
          const listItem = renderEvents(item);
          gallery.appendChild(listItem);
        });
      } else {
        const gallery = document.getElementById('gallery');
        // gallery.innerHTML = '<p>No hay eventos disponibles</p>'; // Muestra un mensaje indicando que no hay eventos
        Notiflix.Notify.warning('No se encontraron eventos disponibles');
      }

      pagination = result.page; // Actualiza el objeto pagination con los nuevos datos de paginación
      renderPagination(); // Actualiza los botones de paginación
    })
    .catch(error => {
      console.error(error);
    });
}

/* ====================================================================================== */
/* ------------------ le hago pruebas a eventos llamados por country -------------------- */
/* ====================================================================================== */

function loadCountry(countryCode, currentPage) {
  document.getElementById('gallery').innerHTML = '';
  currentPage = currentPage || 0; // Establece currentPage en 0 si no se proporciona un valor

  getEvents(currentPage, { countryCode })
    .then(result => {
      const data =
        result._embedded && result._embedded.events
          ? result._embedded.events
          : [];
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = ''; // Limpia el contenido existente antes de agregar los nuevos elementos

      if (data.length === 0) {
        Notiflix.Notify.warning('No hay eventos en tu país');
        paginationBox.innerHTML = ''; // Vacía el contenido del contenedor de paginación
      } else {
        data.forEach(item => {
          const listItem = renderEvents(item);
          gallery.appendChild(listItem);
        });

        pagination = result.page; // Actualiza el objeto pagination con los nuevos datos de paginación
        renderPagination(); // Actualiza los botones de paginación
      }
    })
    .catch(error => {
      console.error(error);
    });
}

/* ======================================================================================*/
/*--- aca cargamos data o elementos desde el boton buscar con una palab ra de busqueda --*/
/* ======================================================================================*/

function loadEvents(keyword, countryCode, currentPage) {
  document.getElementById('gallery').innerHTML = '';
  currentPage = currentPage || 0; // Establece currentPage en 0 si no se proporciona un valor
  getEvents(currentPage, { keyword, countryCode })
    .then(result => {
      const data =
        result._embedded && result._embedded.events
          ? result._embedded.events
          : [];

      if (data.length === 0) {
        Notiflix.Notify.warning('No hay eventos para el artista en tu País');
      } else {
        data.forEach(item => {
          const listItem = renderEvents(item);
          gallery.appendChild(listItem);
        });

        pagination = result.page; // Actualiza el objeto pagination con los nuevos datos de paginación
        renderPagination(); // Actualiza los botones de paginación
      }
    })
    .catch(error => {
      console.error(error);
    });
}

form.addEventListener('submit', e => {
  e.preventDefault(); // Evitar que el formulario se envíe automáticamente
  if (validaForm()) {
    currentPage = 0; // Restablecer currentPage a 0
    if (chooseInput.value !== '' && searchInput.value !== '') {
      loadEvents(searchInput.value, chooseInput.value);
    } else if (chooseInput.value !== '' && searchInput.value === '') {
      loadCountry(chooseInput.value);
    } else if (chooseInput.value === '' && searchInput.value !== '') {
      loadData(searchInput.value);
    }
  }
});

chooseInput.addEventListener('change', () => {
  if (validaForm()) {
    if (chooseInput.value !== '' && searchInput.value !== '') {
      loadEvents(searchInput.value, chooseInput.value);
    } else if (chooseInput.value !== '' && searchInput.value === '') {
      loadCountry(chooseInput.value);
    } else if (chooseInput.value === '' && searchInput.value !== '') {
      loadData(searchInput.value);
    }
  }
});

loadEvents('eagles', 'US', 0); // primer cargado de eventos de la pagina

