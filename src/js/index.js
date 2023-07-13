import getEvents from './eventsApi';
import Notiflix from 'notiflix';
Notiflix.Notify.init();

const form = document.getElementById('search-form');
let chooseInput = document.getElementById('choose');
let searchInput = document.getElementById('search');

let data = [];
let currentPage = 0;
let pagination = {};
let keyword = undefined;
let countryCode = undefined;
const paginationBox = document.getElementById('pages');

function validaForm() {
  const chooseValue = chooseInput.value;
  const searchValue = searchInput.value;

  if (chooseValue.trim() === '' && searchValue.trim() === '') {
    Notiflix.Notify.warning(
      'Por favor, completa alguno de los campos del formulario.'
    );
    loadData({ keyword: 'eagles', countryCode: 'US', currentPage });
    return false;
  }

  return true;
}

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

    addPaginationButton('1');

    if (startPage > 1) {
      addPaginationButton('...');
    }

    for (let i = startPage + 1; i <= endPage; i++) {
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

  if (pageNumber === '1') {
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
        console.log(page, 'pageNumber', pageNumber, currentPage);
      }

      renderPagination();
      //window.scrollTo(0, 0);
      keyword = document.querySelector('#search').value;
      countryCode = chooseInput.value;

      if (!searchInput.value && !chooseInput.value) {
        loadData({ keyword: 'eagles', countryCode: 'US', currentPage });
      }
      if (searchInput.value && !chooseInput.value) {
        loadData({ keyword: keyword, currentPage });
      }
      if (!searchInput.value && chooseInput.value) {
        loadData({ countryCode: countryCode, currentPage });
      }
      if (searchInput.value && chooseInput.value) {
        loadData({ keyword: keyword, countryCode: countryCode, currentPage });
      }
    });
  } else {
    page.classList.add('footer__spam');
  }

  if (currentPage === pageNumber - 1) {
    page.classList.add('active');
  }
  /*
  if (pageNumber === '<' && currentPage === 0) {
    page.disabled = true;
  }
*/
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
    <h3 class="gallery__name">${eventName}</h3> 
    <p class="gallery__date">${item.dates.start.localDate}</p> 
    <p class="gallery__city">
      <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 0C1.34581 0 0 1.40339 0 3.12836C0 5.29645 3.00295 9 3.00295 9C3.00295 9 6 5.18983 6 3.12836C6 1.40339 4.65424 0 3 0ZM3.90516 4.04434C3.65558 4.30455 3.32781 4.43469 3 4.43469C2.67224 4.43469 2.34437 4.30455 2.09489 4.04434C1.59577 3.52392 1.59577 2.67709 2.09489 2.15662C2.33658 1.90448 2.65807 1.76561 3 1.76561C3.34193 1.76561 3.66337 1.90453 3.90516 2.15662C4.40428 2.67709 4.40428 3.52392 3.90516 4.04434Z" fill="white"/>
      </svg>
      ${venueCity}
    </p>
  `;
  return listItem;
}

function loadData(options) {
  document.getElementById('gallery').innerHTML = '';
  getEvents(currentPage, options)
    .then(result => {
      const data =
        result._embedded && result._embedded.events
          ? result._embedded.events
          : [];

      if (data.length === 0) {
        /* ======================================================================== */
        /* ====================== si no hay eventos por pais ====================== */
        /* ======================================================================== */
        console.log(
          'no hay eventos en: ',
          chooseInput.options[chooseInput.selectedIndex].textContent
        ); // texto del pais de busqueda
        Notiflix.Notify.warning('No hay eventos disponibles');
        paginationBox.innerHTML = ''; // Vacía el contenido del contenedor de paginación
        const reloadButton = document.createElement('button');
        reloadButton.textContent = 'Recargar';

        reloadButton.addEventListener('click', () => {
          location.reload(); // Recarga la página actual
        });

        paginationBox.appendChild(reloadButton);
        reloadButton.classList.add('gallery__noevents');
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
    const options = {
      keyword: searchInput.value,
      countryCode: chooseInput.value,
    };
    loadData(options);
  }
});

chooseInput.addEventListener('change', () => {
  if (validaForm()) {
    currentPage = 0; // Restablecer currentPage a 0
    const options = {
      keyword: searchInput.value,
      countryCode: chooseInput.value,
    };
    loadData(options);
  }
});

// Primer cargado de eventos de la pagina
const initialOptions = { keyword: 'eagles', countryCode: 'US' };
loadData(initialOptions);
