const countrySelect = document.querySelector('.options');
const wrapper = document.querySelector('.wrapper');
const selectBtn = document.querySelector('.select-btn');
const searchInp = document.querySelector('.search-country');
const countryList = document.querySelectorAll('.countryLi');

async function fetchCountries(api) {
  try {
    const response = await fetch(api);
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.log(error.message);
  }
}

function renderCountries(countries) {
  countries.forEach(country => {
    countrySelect.insertAdjacentHTML(
      'beforeend',
      `
            <li value="${country['cca2']}" class="countryLi">${country['name']['common']}</li>
            `
    );
  });
}
