eventsApi.js

El objeto eventsApi contiene varios métodos que puedes utilizar para realizar diferentes tipos de consultas a la API:

  1.  getByKey(keyWord, page): Este método obtiene eventos basados en una palabra clave. Puedes proporcionar una palabra clave y un número de página opcional para paginar los resultados.

  2.  getByCountry(countryCode, page): Este método obtiene eventos basados en el código de país. Puedes proporcionar un código de país y un número de página opcional para paginar los resultados.

  3.  getByKeyAndCountry(keyWord, countryCode, page): Este método obtiene eventos basados en una palabra clave y un código de país. Puedes proporcionar una palabra clave, un código de país y un número de página opcional para paginar los resultados.

  4.  getById(id): Este método obtiene un evento específico basado en su ID.

  5.  getRandom(page): Este método obtiene eventos aleatorios. Puedes proporcionar un número de página opcional para paginar los resultados.

Cada uno de estos métodos realiza una solicitud a la API de Ticketmaster utilizando los parámetros correspondientes y devuelve la respuesta en formato JSON.