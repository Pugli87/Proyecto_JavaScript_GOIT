import eventsApi from './eventsApi.js';
import { galleryItems } from './gallery-items.js';
const modal = document.querySelector('#myModal');
const span = document.querySelector('.svg-close');

// Melementos del modal
const eventImgHead = document.querySelector('.event-image-head');
const eventImgMain = document.querySelector('.main-event-image');
const info = document.querySelector('.infotext');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const location = document.querySelector('.location');
const place = document.querySelector('.place');
const who = document.querySelector('.whoname');
const standartPrice = document.querySelector('.standartprice');
const vipPrice = document.querySelector('.vip-price');

// Abre la ventana modal cuando se hace clic en el evento
document.querySelectorAll('.main-event-image').forEach((eventImage, index) => {
  eventImage.addEventListener('click', () => {
    const { info, when, where, who, prices } = galleryItems[index];

    modal.style.display = 'flex';
    eventImgHead.src = eventImage.dataset.eventimghead;
    eventImgMain.src = eventImage.dataset.eventimgmain;
    info.textContent = info;
    date.textContent = when.date;
    time.textContent = when.time;
    location.textContent = where.location;
    place.textContent = where.place;
    who.textContent = who.name;

    if (prices.standart) {
      standartPrice.textContent = `Standart ${prices.standart}`;
    } else {
      standartPrice.textContent = '';
    }

    if (prices.vip) {
      vipPrice.textContent = `VIP ${prices.vip}`;
    } else {
      vipPrice.textContent = '';
    }
  });
});

// cierra la ventana modal cuando se hace clic en cerrar
span.addEventListener('click', () => {
  modal.style.display = 'none';
});

// cierra la ventana modal cuando se hace clic fuera de esta
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
