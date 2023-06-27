import eventsApi from '../js/eventsApi';
// hago una referencia al elemento del formulario y al campo de entrada
const form = document.getElementById('search-form');
const input = form.querySelector('input');
const startBtn = document.getElementById('start-btn');
const chooseBtn = document.getElementById('choose-btn');

let data = [];

/*====================================================================================*/
/*---------------------------- ejemplos de evento de api -----------------------------*/
/*====================================================================================*/

/*
eventsApi
  .getByKey('keyword') // en keyWord colocamos la palabra del evento q queremos buscar
  .then(result => {
    // Hacer algo con el resultado de la búsqueda
    console.log(result);
  })
  .catch(error => {
    // Manejar cualquier error que ocurra
    console.error(error);
  });*/

/*====================================================================================*/
/*------------------------ CARGAMOS MAS IMAGENES CO9N SCROLL -------------------------*/
/*====================================================================================*/

/*
let currentPage = 0;
let isLoading = false;

// Función para cargar eventos
function loadEvents() {
  if (isLoading) {
    return; // Evitar llamadas duplicadas mientras se está cargando
  }
  isLoading = true;

  eventsApi
    .getRandom(currentPage)
    .then(result => {
      const newEvents = result._embedded.events;

      if (newEvents.length > 0) {

        // Si hay nuevos eventos, se agregan al array existente
        data = [...data, ...newEvents];
        console.log(data);
        
        // Mostrar los nuevos eventos en la página
        newEvents.forEach(item => {
          document.getElementById('gallery').innerHTML += `
            <li class="gallery__item">
              <a href="" class="gallery__link">
                <img class="gallery__img" src="${item.images[5].url}"> <br/>
              </a>
              <span class="gallery__name">${item.name}</span> <br/>
              <span class="gallery__date">${
                item.dates.start.localDate
              }</span> <br/>
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

        isLoading = false;
      } else {
        // No hay más eventos, deshabilitar la carga
        //document.removeEventListener('scroll', handleScroll);
      }
    })
    .catch(error => {
      console.log(error);
      isLoading = false;
    }
  );
}

// Función para manejar el evento de scroll
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    // Cuando se llega al final de la página, cargar más eventos
    loadEvents();
  }
}

// Agregar el evento de scroll
document.addEventListener('scroll', handleScroll);

// Cargar los eventos iniciales
loadEvents();
*/

/* --------------------------------------------------------------------------------------*/
/* --- En esta parte se hace el primer cargado de elementos para mostar en la pagina ----*/
/* --------------------------------------------------------------------------------------*/

eventsApi // objeto del archivo eventsApi.js
  .getRandom()
  .then(result => {
    data = result._embedded.events;
    data.map(item => {
      document.getElementById('gallery').innerHTML += `
      <li class="gallery__item">
        <a href="" class="gallery__link">
          <img class="gallery__img" src="${item.images[4].url}"> <br/>
        </a>
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
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

/* --------------------------------------------------------------------------------------*/
/*--- aca cargamos data o elementos desde el boton buscar con una palab ra de busqueda --*/
/* --------------------------------------------------------------------------------------*/

function loadData(keyword) {
  document.getElementById('gallery').innerHTML = '';
  eventsApi
    .getByKey(keyword)
    .then(result => {
      result;
      console.log(result._embedded.venues[1].country.name);
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

startBtn.addEventListener('click', () => {
  loadData(document.querySelector('#search').value);
  // const resultado = document.querySelector('.resultado');
  // resultado.textContent = `Te gusta el sabor ${event.target.value}`;
});

// country selector
chooseBtn.addEventListener('click', () => {
  // loadcountry(document.getElementById('choose').value);
  console.log(choose);
  const infocity = document.getElementById(choose).value;
  console.log(infocity.value);
  eventsApi
    .getByCountry(country) // en keyWord colocamos la palabra del evento q queremos buscar

    .then(result => {
      // Hacer algo con el resultado de la búsqueda
      console.log(result);
    })
    .catch(error => {
      // Manejar cualquier error que ocurra
      console.error(error);
    });
  // const resultado = document.querySelector('.resultado');
  // resultado.textContent = `Te gusta el sabor ${event.target.value}`;
});
// --------------------------------PAGINACION--------------------
function addStyle() {
  const paginationButtons = document.querySelectorAll('.pag-but');
  paginationButtons.forEach(button => {
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
  });
}
const paginationBox = document.querySelector('.pagination');

eventsJS.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  eventsJS.eventList.replaceChildren('');
  paginationBox.replaceChildren('');

  eventsJS
    .fetchEvents(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=Thqn5txrZvBNrP2vPhyOGtn3h4ymZ92S&keyword=${
        eventsJS.eventInput.value
      }&size=200&countryCode=${countrySearhJS.selectBtn.firstElementChild.getAttribute(
        'value'
      )}`
    )
    .then(data => {
      console.log(data['page']['totalElements']);

      if (data['page']['totalElements'] === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no events matching your search query. Please try again.'
        );
      }
      const events = data['_embedded']['events'];
      const eventsPerPage = 20; // Кількість подій на сторінці
      const totalPages = Math.ceil(events.length / eventsPerPage); // Загальна кількість сторінок
      let currentPage = 1; // Початкова сторінка

      // Функція для рендерингу подій на поточній сторінці
      function renderPage(page) {
        eventsJS.eventList.replaceChildren('');
        const startIndex = (page - 1) * eventsPerPage;
        const endIndex = page * eventsPerPage;
        const eventsToRender = events.slice(startIndex, endIndex);
        eventsJS.renderEvents(eventsToRender);
        addStyle();
      }

      // Функція для відображення посторінкової навігації
      function renderPagination() {
        // Створення кнопок для кожної сторінки
        for (let i = 1; i <= totalPages; i += 1) {
          const button = document.createElement('button');
          button.textContent = i;
          button.addEventListener('click', () => {
            currentPage = i;
            renderPage(currentPage);
          });
          paginationBox.appendChild(button);
          button.classList.add('pag-but');

          const changeTheme = document.querySelector('.thema-mode');
          let pageButClass = '';

          if (changeTheme.classList.contains('light-mode')) {
            pageButClass = 'pag-but-blue';
            button.classList.add(pageButClass);
            console.log(pageButClass);
          }
          addStyle();
        }
      }

      renderPage(currentPage);
      renderPagination();
    });
});
