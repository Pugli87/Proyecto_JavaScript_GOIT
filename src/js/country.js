import eventsApi from './eventsApi';
console.log('hola');
// document.addEventListener('DOMContentLoaded', () => {
const countrySelect = document.querySelector('.options');
const wrapper = document.querySelector('.form__cont');
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const chooseBtn = document.getElementById('choose-btn');

//   async function fetchCountries(BASE_URL) {
//     try {
//       const response = await fetch(BASE_URL);
//       const data = await response.json();
//       const countries = data.countries;
//       return countries;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   function renderCountries(countries) {
//     countries.forEach(country => {
//       const listItem = document.createElement('li');
//       listItem.value = country.cca2;
//       listItem.textContent = country.name.common;
//       listItem.classList.add('countryLi');
//       countrySelect.appendChild(listItem);
//     });
//   }

//   fetchCountries(BASE_URL)
//     .then(countries => renderCountries(countries))
//     .catch(error => console.log(error.message));
// });
Document.getElementById('choose-btn').addEventlistener('click', () => {
  eventsApi
    .getByCountry('LONDON', (page = 0)) // en keyWord colocamos la palabra del evento q queremos buscar
    .then(result => {
      // Hacer algo con el resultado de la búsqueda
      console.log(result);
    })
    .catch(error => {
      // Manejar cualquier error que ocurra
      console.error(error);
    });
});
function loadcountry(keyword) {
  document.getElementById('gallery').innerHTML = '';
  eventsApi
    .getByCountry(keyword)
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

chooseBtn.addEventListener('click', () => {
  // loadcountry(document.getElementById('choose').value);
  console.log('click choose');
  // const resultado = document.querySelector('.resultado');
  // resultado.textContent = `Te gusta el sabor ${event.target.value}`;
});
