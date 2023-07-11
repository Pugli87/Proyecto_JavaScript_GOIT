const API_KEY = 'xtboiYIsAyoQG85vMxNOToDrUrhqLhlf';
const BASE_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=16&includeTBA=no&includeTBD=no&sort=random`;

async function getEvents(page = 0, options) {
  try {
    let searchRequest = `${BASE_URL}&page=${page}`;
    if (options.keyword !== undefined) {
      searchRequest = `${searchRequest}&keyword=${options.keyword}`;
    }
    if (options.countryCode !== undefined) {
      searchRequest = `${searchRequest}&countryCode=${options.countryCode}`;
    }
    const response = await fetch(searchRequest);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export default getEvents;
