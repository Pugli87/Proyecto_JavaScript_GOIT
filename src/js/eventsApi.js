const API_KEY = 'xtboiYIsAyoQG85vMxNOToDrUrhqLhlf';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const BASE_URL2 = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}}&size=16&includeTBA=no&includeTBD=no&sort=random`;

const eventsApi = {
  async getByKey(keyWord, page = 0) {
    try {
      const searchRequest = `${BASE_URL}events.json?&keyword=${keyWord}&apikey=${API_KEY}&size=16&page=${page}&includeTBA=no&includeTBD=no&sort=random`;
      const responce = await fetch(searchRequest);
      const result = await responce.json();
      pagination = result.page;
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
      pagination = result.page;
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
      pagination = result.page;
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
      pagination = result.page;
      return result;
    } catch (err) {
      return err;
    }
  },

  async getEvents(page = 0, options) {
    try {
      let searchRequest = `${BASE_URL2}&page=${page}`;
      if (options.keyword) {
        searchRequest += `&keyword=${options.keyWord}`;
      }
      // searchRequest  &keyword=madonna
      if (options.countryCode) {
        searchRequest += `&countryCode=${options.countryCode}`;
      }
      // searchRequest  &keyword=madonna&countryCode=US
      const responce = await fetch(searchRequest);
      const result = await responce.json();

      pagination = result.page;
      return result;
    } catch (err) {
      return err;
    }
  },
};

export default eventsApi;
