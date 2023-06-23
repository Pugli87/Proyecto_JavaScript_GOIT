console.log('cv');

import eventsApi from '../js/eventsApi';

eventsApi
  .getByKey('keyWord') // en keyWord colocamos la palabra del evento q queremos buscar
  .then(result => {
    // Hacer algo con el resultado de la búsqueda
    console.log(result);
  })
  .catch(error => {
    // Manejar cualquier error que ocurra
    console.error(error);
  });