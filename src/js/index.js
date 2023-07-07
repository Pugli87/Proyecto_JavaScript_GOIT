import eventsApi from '../js/eventsApi';
/* notiflix */
import Notiflix from 'notiflix';
Notiflix.Notify.init();

// hago una referencia al elemento del formulario y al campo de entrada
const form = document.getElementById('search-form');
let chooseInput = document.getElementById('choose');
let searchInput = document.getElementById('search');

document.querySelector('#choose').value;
let data = [];
let currentPage = 0;
let keyword = ''; // Variable global para almacenar la palabra clave de búsqueda
const paginationBox = document.getElementById('pages');
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

/* paginacion funcional sin bontones de primera pagina y ultima pagina
function renderPagination() {
  if (pagination.totalPages !== undefined && pagination.totalElements > 0) {
    const maxButtons = 5; // Número máximo de botones de paginación a mostrar
    const totalPages = pagination.totalPages;
    let startPage, endPage;

    if (totalPages <= maxButtons) {
      // Si el número de páginas es menor o igual al número máximo de botones
      startPage = 1;
      endPage = totalPages;
    } else {
      // Si hay más páginas que el número máximo de botones
      if (currentPage <= Math.floor(maxButtons / 2)) {
        // Si estamos en las primeras páginas
        startPage = 1;
        endPage = maxButtons;
      } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
        // Si estamos en las últimas páginas
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        // Si estamos en páginas intermedias
        startPage = currentPage - Math.floor(maxButtons / 2);
        endPage = currentPage + Math.ceil(maxButtons / 2) - 1;
      }
    }

    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor antes de agregar los nuevos botones

    for (let i = startPage; i <= endPage; i++) {
      addPaginationButton(i);
    }
  } else {
    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor si no hay eventos disponibles
  }
}

function addPaginationButton(pageNumber) {
  const page = document.createElement('button');
  page.textContent = pageNumber;
  page.setAttribute('data-page', pageNumber); // Asigna el número de página como atributo personalizado
  // Verificar si el número de página actual coincide con el número del botón
  if (currentPage === pageNumber - 1) {
    page.classList.add('active'); // Agrega la clase de estilo para el botón activo
  }
  page.addEventListener('click', event => {
    const selectedPage = parseInt(event.target.textContent);
    currentPage = selectedPage - 1;
    renderPagination();
    window.scrollTo(0, 0); // Desplazarse al principio de la página después de cambiar de página
    console.log(`Botón ${selectedPage} seleccionado`);
    keyword = document.querySelector('#search').value;
    countryCode = chooseInput.value; // Obtener el valor de countryCode desde chooseInput
    if (!searchInput.value && !chooseInput.value) {
      console.log('Pagina actual', currentPage);
      loadRandom(currentPage);
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
  paginationBox.appendChild(page);
  page.classList.add('footer__page');
}
*/

function renderPagination() {
  if (pagination.totalPages !== undefined && pagination.totalElements > 0) {
    const maxButtons = 5; // Número máximo de botones de paginación a mostrar
    const totalPages = pagination.totalPages;
    let startPage, endPage;

    if (totalPages <= maxButtons) {
      // Si el número de páginas es menor o igual al número máximo de botones
      startPage = 1;
      endPage = totalPages;
    } else {
      // Si hay más páginas que el número máximo de botones
      if (currentPage <= Math.floor(maxButtons / 2)) {
        // Si estamos en las primeras páginas
        startPage = 1;
        endPage = maxButtons - 1;
      } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
        // Si estamos en las últimas páginas
        startPage = totalPages - maxButtons + 2;
        endPage = totalPages;
      } else {
        // Si estamos en páginas intermedias
        startPage = currentPage - Math.floor(maxButtons / 2) + 1;
        endPage = currentPage + Math.floor(maxButtons / 2);
      }
    }

    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor antes de agregar los nuevos botones

    addPaginationButton(1);

    if (startPage > 2) {
      addPaginationButton('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      addPaginationButton(i);
    }

    if (endPage < totalPages - 100) {
      addPaginationButton('...');
    }

    addPaginationButton(totalPages);
  } else {
    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor si no hay eventos disponibles
  }
}

function addPaginationButton(pageNumber) {
  const page = document.createElement('button');
  page.textContent = pageNumber;
  page.setAttribute('data-page', pageNumber); // Asigna el número de página como atributo personalizado
  page.addEventListener('click', event => {
    const selectedPage = parseInt(event.target.textContent);
    currentPage = selectedPage - 1;
    renderPagination();
    window.scrollTo(0, 0); // Desplazarse al principio de la página después de cambiar de página
    console.log(`Botón ${selectedPage} seleccionado`);
    keyword = document.querySelector('#search').value;
    countryCode = chooseInput.value; // Obtener el valor de countryCode desde chooseInput
    if (!searchInput.value && !chooseInput.value) {
      console.log('Pagina actual', currentPage);
      loadRandom(currentPage);
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

  // Verificar si el número de página actual coincide con el número del botón
  if (currentPage === pageNumber - 1) {
    page.classList.add('active'); // Agrega la clase de estilo para el botón activo
  }

  paginationBox.appendChild(page);
  page.classList.add('footer__page');
}

/*======================================================================================= */
// funcion para dibujar el html en la pagina

function renderEvents(item) {
  const imageUrl = item?.images.filter(item => item.width > 600)[0].url;
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
    <a href="#" class="gallery__link">
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
  return listItem;
}

/* ======================================================================================*/
/* --- En esta parte se hace el primer cargado de elementos para mostar en la pagina ----*/
/* ======================================================================================*/

function loadRandom(currentPage) {
  eventsApi
    .getRandom(currentPage)
    .then(result => {
      const data = result._embedded.events;
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = ''; // Limpia el contenido existente antes de agregar los nuevos elementos
      data.forEach(item => {
        const listItem = renderEvents(item);
        gallery.appendChild(listItem);
      });

      pagination = result.page; // Actualiza el objeto pagination con los nuevos datos de paginación
      renderPagination(); // Actualiza los botones de paginación

      if (data.length === 0) {
        paginationBox.innerHTML = ''; // Vacía el contenido del contenedor si no hay eventos disponibles
        Notiflix.Notify.warning('No hay eventos disponibles');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

loadRandom(currentPage);

/* ======================================================================================*/
/*--- aca cargamos data o elementos desde el boton buscar con una palab ra de busqueda --*/
/* ======================================================================================*/

function loadData(keyword, currentPage) {
  document.getElementById('gallery').innerHTML = '';
  eventsApi
    .getByKey(keyword, currentPage)
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
/*
function loadData(keyword, currentPage) {
  document.getElementById('gallery').innerHTML = '';
  eventsApi
    .getByKey(keyword, currentPage)
    .then(result => {
      let totalPages =
        result.pagination && result.pagination.totalPages
          ? result.pagination.totalPages
          : 0;

      if (totalPages > 0) {
        data = result._embedded.events;
        data.forEach(item => {
          const listItem = renderEvents(item);
          gallery.appendChild(listItem);
        });
      } else {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '<p>No hay eventos disponibles</p>'; // Muestra un mensaje indicando que no hay eventos
      }

      pagination = result.page; // Actualiza el objeto pagination con los nuevos datos de paginación
      renderPagination(); // Actualiza los botones de paginación
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        console.log('Error 404: No se encontraron resultados');
        // Maneja el caso de error 404, por ejemplo, mostrando un mensaje al usuario
      } else {
        console.error(error);
      }
    });
}*/

/* ====================================================================================== */
/* ------------------ le hago pruebas a eventos llamados por country -------------------- */
/* ====================================================================================== */

function loadCountry(countryCode, currentPage) {
  document.getElementById('gallery').innerHTML = '';
  currentPage = currentPage || 0; // Establece currentPage en 0 si no se proporciona un valor
  eventsApi
    .getByCountry(countryCode, currentPage)
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
  eventsApi
    .getByKeyAndCountry(keyword, countryCode, currentPage)
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
