import eventsApi from '../js/eventsApi';

// hago una referencia al elemento del formulario y al campo de entrada
const form = document.getElementById('search-form');
const startBtn = document.getElementById('start-btn');
const chooseInput = document.getElementById('choose');
const searchInput = document.getElementById('search');

document.querySelector('#choose').value;
let data = [];
let currentPage = 1;
let keyword = ''; // Variable global para almacenar la palabra clave de búsqueda
const paginationBox = document.getElementById('pages');
function validaForm() {
  const chooseValue = chooseInput.value;
  const searchValue = searchInput.value;

  if (chooseValue.trim() === '' && searchValue.trim() === '') {
    alert('Por favor, completa alguno de los campos del formulario.');
    return false;
  }

  return true;
}

/* ===================================================================================== */
/* -------------- Estas dos funciones son para la paginacion de la pagina -------------- */
/* ===================================================================================== */

function renderPagination() {
  if (pagination.totalPages !== undefined) {
    const maxButtons = 5; // Número máximo de botones de paginación a mostrar
    const totalPages = Math.min(pagination.totalPages, maxButtons); // Asegura que el número de botones no sea mayor que el total de páginas
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 3));
    const endPage = Math.min(startPage + totalPages - 1, pagination.totalPages);

    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor antes de agregar los nuevos botones

    for (let i = startPage; i <= endPage; i++) {
      addPaginationButton(i);
    }
  }
}
function addPaginationButton(pageNumber) {
  const page = document.createElement('button');
  page.textContent = pageNumber;
  page.setAttribute('data-page', pageNumber); // Asigna el número de página como atributo personalizado
  page.addEventListener('click', event => {
    const selectedPage = parseInt(event.target.textContent);
    paginationBox.innerHTML = ''; // Vacía el contenido del contenedor antes de agregar los nuevos botones
    currentPage = selectedPage - 1;
    renderPagination(currentPage);
    window.scrollTo(0, 0); // Desplazarse al principio de la página después de cambiar de página
    console.log(`Botón ${selectedPage} seleccionado`);
    keyword = document.querySelector('#search').value;
    if (!searchInput.value && !chooseInput.value) {
      console.log('Pagina actual', currentPage);
      loadRandom(currentPage);
    }
    if (searchInput.value && !chooseInput.value) {
      loadData(keyword, currentPage);
    }

    if (!searchInput.value && chooseInput.value) {
      loadCountry(keyword, currentPage);
    }
    if (searchInput.value && chooseInput.value) {
      loadEvents(keyword, countryCode, currentPage);
    }
  });
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
      renderPagination();
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
      }
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
  eventsApi
    .getByCountry(countryCode, currentPage)
    .then(result => {
      const data = result._embedded.events;
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = ''; // Limpia el contenido existente antes de agregar los nuevos elementos
      data.forEach(item => {
        const listItem = renderEvents(item);
        gallery.appendChild(listItem);
      });
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
      const data = result._embedded.events;
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = ''; // Limpia el contenido existente antes de agregar los nuevos elementos
      data.forEach(item => {
        const listItem = renderEvents(item);
        gallery.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

startBtn.addEventListener('click', () => {
  if (validaForm()) {
    if (
      document.querySelector('#choose').value !== '' &&
      document.querySelector('#search').value
    ) {
      loadEvents(
        document.querySelector('#search').value,
        document.querySelector('#choose').value
      );
      // searchInput.value = ''; //eliminar contenido
    } else if (
      !document.querySelector('#search').value &&
      document.querySelector('#choose').value
    ) {
      loadCountry(document.querySelector('#choose').value);
    } else if (
      document.querySelector('#search').value &&
      !document.querySelector('#choose').value
    ) {
      loadData(document.querySelector('#search').value);
    }
  }
});

chooseInput.addEventListener('change', () => {
  if (validaForm()) {
    if (
      document.querySelector('#choose').value !== '' &&
      document.querySelector('#search').value
    ) {
      loadEvents(
        document.querySelector('#search').value,
        document.querySelector('#choose').value
      );
      // searchInput.value = ''; //eliminar contenido
    } else if (
      !document.querySelector('#search').value &&
      document.querySelector('#choose').value
    ) {
      loadCountry(document.querySelector('#choose').value);
    } else if (
      document.querySelector('#search').value &&
      !document.querySelector('#choose').value
    ) {
      loadData(document.querySelector('#search').value);
    }
  }

  // currentPage = 1;
  // page.textContent = 1;
  // pagePrev.textContent = 2;
  // pageNext.textContent = 3;
});

/* ====================================================================================== */
/* --------------------------------- Probando paginacion -------------------------------- */
/* ====================================================================================== */
/*
=============================================================
Insertar el HTML dentro del contenedor utilizando innerHTML
=============================================================

if (Responce && responce.length > 0) {
  const pagesContainer = document.getElementById('pages');

  // HTML que deseas insertar dentro del contenedor
  const html = `
    <button class="footer__page" id="page"></button>
    <button class="footer__page" id="pagePrev"></button>
    <button class="footer__page" id="pageNext"></button>
  `;
==============================================================
==============================================================
==============================================================
  // Insertar el HTML dentro del contenedor utilizando innerHTML
  pagesContainer.innerHTML = html;
} else {
  console.log('No se encontraron datos en la API.');
}*/
/*
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let page = document.getElementById('page');
let pagePrev = document.getElementById('pagePrev');
let pageNext = document.getElementById('pageNext');

//page.textContent = currentPage; // asignacion de la pagina al html por medio del DOM
//pagePrev.textContent = parseInt(page.textContent) + 1;
//pageNext.textContent = parseInt(pagePrev.textContent) + 1;
console.log(currentPage);
function goToPreviousPage() {
  console.log(currentPage);
  if (currentPage > 1) {
    currentPage--;
    page.textContent = currentPage;
    //pagePrev.textContent -= 1;
    pagePrev.textContent = parseInt(page.textContent) + 1;
    //pageNext.textContent -= 1;
    pageNext.textContent = parseInt(pagePrev.textContent) + 1;
    //loadRandom(currentPage);
  }
}

function goToNextPage() {
  currentPage++;
  //page.textContent = currentPage;
  // pagePrev.textContent = parseInt(page.textContent) + 1;
  // pageNext.textContent = parseInt(pagePrev.textContent) + 1;
  //loadRandom(currentPage);
}
// eventos de botones para avanzar o atrasar la pagina
prev?.addEventListener('click', goToPreviousPage);
next?.addEventListener('click', goToNextPage);

page?.addEventListener('click', () => {
  keyword = document.querySelector('#search').value;
  currentPage = page.textContent;
  if (!searchInput.value && !chooseInput.value) {
    console.log('pugli', currentPage);
    loadRandom(currentPage);
  }
  if (searchInput.value && !chooseInput.value) {
    loadData(keyword, currentPage);
  }

  if (!searchInput.value && chooseInput.value) {
    loadCountry(keyword, currentPage);
  }
  if (searchInput.value && chooseInput.value) {
    loadEvents(keyword, countryCode, currentPage);
  }
});

pagePrev?.addEventListener('click', () => {
  console.log(pagePrev.textContent);
  keyword = document.querySelector('#search').value;
  currentPage = parseInt(page.textContent) + 1;
  if (!searchInput.value && !chooseInput.value) {
    console.log('pugli', currentPage);
    loadRandom(currentPage);
  }
  if (searchInput.value && !chooseInput.value) {
    loadData(keyword, currentPage);
  }

  if (!searchInput.value && chooseInput.value) {
    loadCountry(keyword, currentPage);
  }
  if (searchInput.value && chooseInput.value) {
    loadEvents(keyword, countryCode, currentPage);
  }
});

pageNext?.addEventListener('click', () => {
  console.log(pageNext.textContent);
  keyword = document.querySelector('#search').value;
  currentPage = parseInt(pagePrev.textContent) + 1;
  if (!searchInput.value && !chooseInput.value) {
    loadRandom(currentPage);
  }
  if (searchInput.value && !chooseInput.value) {
    loadData(keyword, currentPage);
  }

  if (!searchInput.value && chooseInput.value) {
    loadCountry(keyword, currentPage);
  }
  if (searchInput.value && chooseInput.value) {
    loadEvents(keyword, countryCode, currentPage);
  }
});
*/
