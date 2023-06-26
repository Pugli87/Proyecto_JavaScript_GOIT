const countrySelect = document.querySelector('.options');
const wrapper = document.querySelector('.form__cont');
const selectBtn = document.querySelector('.select-btn');
const searchInp = document.querySelector('.form__input');
const countryList = document.querySelectorAll('.countryLi');

async function fetchCountries(BASE_URL) {
  try {
    const response = await fetch(BASE_URL);
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
