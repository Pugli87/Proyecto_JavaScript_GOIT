import Notiflix from 'notiflix';
import * as EventJS from './Event.js';
import * as loaderJS from './loader.js';
import * as countrySearhJS from './country.js';

eventsApi
  .getByKey('API_KEY') // en keyWord colocamos la palabra del evento q queremos buscar
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
Notiflix.Notify.init({
  failure: {
    background: '#FFFFFF',
    textColor: '#000000',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: '#DC56C5',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: '#DC56C5',
    backOverlayColor: 'rgba(255,85,73,0.2)',
    fontFamily: 'Montserrat',
  },
});
//            country select
countrySearhJS
  .fetchCountries('https://restcountries.com/v3.1/all')
  .then(data => {
    countrySearhJS.renderCountries(data);
  });

countrySearhJS.selectBtn.addEventListener('click', () => {
  countrySearhJS.wrapper.classList.toggle('active');
  countrySearhJS.selectBtn.classList.toggle('active-border');
});

countrySearhJS.countrySelect.addEventListener('click', event => {
  const countryList = document.querySelectorAll('.countryLi');
  countryList.forEach(countryEl => {
    if (event.target === countryEl) {
      if (event.target.getAttribute('value') === 'nothing') {
        countrySearhJS.selectBtn.firstElementChild.setAttribute('value', '');
      } else {
        countrySearhJS.selectBtn.firstElementChild.setAttribute(
          'value',
          `${event.target.getAttribute('value')}`
        );
      }

      console.log(event.target.getAttribute('value'));
      countrySearhJS.wrapper.classList.remove('active');
      countrySearhJS.selectBtn.classList.toggle('active-border');
      countrySearhJS.selectBtn.firstElementChild.innerText =
        event.target.innerText;
    }
  });
});

//             loader
window.addEventListener('load', () => {
  loaderJS.mask.classList.add('hide');
  setTimeout(() => {
    loaderJS.mask.remove();
  }, 1000);
});
