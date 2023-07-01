const API_KEY = 'xtboiYIsAyoQG85vMxNOToDrUrhqLhlf';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const eventsApi = {
  async getByKey(keyWord, page = 5) {
    try {
      const searchRequest = `${BASE_URL}events.json?&keyword=${keyWord}&apikey=${API_KEY}&size=16&page=${page}&includeTBA=no&includeTBD=no&sort=random`;
      const responce = await fetch(searchRequest);
      const result = await responce.json();
      return result;
    } catch (err) {
      return err;
    }
  },

  async getByCountry(countryCode, page = 0) {
    try {
      const searchRequest = `${BASE_URL}events.json?&countryCode=${countryCode}&apikey=${API_KEY}&size=16&page=${page}&includeTBA=no&includeTBD=no&sort=random`;
      const responce = await fetch(searchRequest);
      const result = await responce.json();
      return result;
    } catch (err) {
      return err;
    }
  },

  async getByKeyAndCountry(keyWord, countryCode, page = 0) {
    try {
      const searchRequest = `${BASE_URL}events.json?&keyword=${keyWord}&countryCode=${countryCode}&apikey=${API_KEY}&size=16&page=${page}&includeTBA=no&includeTBD=no&sort=random`;
      const responce = await fetch(searchRequest);
      const result = await responce.json();
      return result;
    } catch (err) {
      return err;
    }
  },

  async getById(id) {
    try {
      const searchRequest = `${BASE_URL}events.json?&apikey=${API_KEY}&id=${id}&includeTBA=no&includeTBD=no&sort=random`;
      const responce = await fetch(searchRequest);
      const result = await responce.json();
      return result;
    } catch (err) {
      return err;
    }
  },

  async getRandom(page = 0) {
    try {
      const searchRequest = `${BASE_URL}events.json?&apikey=${API_KEY}&page=${page}&size=16&includeTBA=no&includeTBD=no&sort=random`;
      const responce = await fetch(searchRequest);
      const result = await responce.json();
      return result;
    } catch (err) {
      return err;
    }
  },
};

export default eventsApi;
