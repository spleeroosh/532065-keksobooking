'use strict';
(function () {

window.MIN_ARRAY_LENGTH = 0;
window.flats = [];

window.mapPinsList = document.querySelector('.map__pins');
window.mapCardList = document.querySelector('.map');

window.data.getNewData();
window.form = document.querySelector('.ad-form');

mapPinsList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName === 'BUTTON') {
    mapCardList.appendChild(window.card.renderNewCard(flats[target.id]));
    window.cardElement.classList.remove('hidden');
  } else if (target.tagName === 'IMG') {
    mapCardList.appendChild(window.card.renderNewCard(flats[target.parentElement.id]));
    window.cardElement.classList.remove('hidden');
  }
});

window.cardElement.querySelector('.popup__close').addEventListener('click', function () {
  cardElement.classList.add('hidden');
});

})();

