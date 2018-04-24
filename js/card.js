'use strict';
(function () {
  var mapCardSimilar = document.querySelector('template').content.querySelector('.map__card');
  window.cardElement = mapCardSimilar.cloneNode(true);
  window.card = {
    /**
     * Функция отрисовки новой карточки
     * @param {Object} flatsObj Передаем объект массива flats
     * @return {*} Возвращаем новую карточку, отрисованную на основе данных объекта из массива flats
     */
    renderNewCard: function (flatsObj) {
      cardElement.querySelector('img').src = flatsObj.author;
      cardElement.querySelector('.popup__text--address').textContent = flatsObj.offer.address;
      cardElement.querySelector('.popup__title').textContent = flatsObj.offer.title;
      cardElement.querySelector('.popup__text--price').textContent = flatsObj.offer.price;
      cardElement.querySelector('.popup__type').textContent = flatsObj.offer.type;
      cardElement.querySelector('.popup__text--capacity').textContent = flatsObj.offer.rooms + ' комнаты для ' + flatsObj.offer.guests + ' гостей.';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + flatsObj.offer.checkin + ', выезд до ' + flatsObj.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = flatsObj.offer.description;
      cardElement.querySelector('.popup__features').textContent = '';
      cardElement.querySelector('.popup__photos').textContent = '';
      cardElement.querySelector('ul').appendChild(window.data.getNewFeatures(flatsObj.offer.features));
      cardElement.querySelector('.popup__photos').appendChild(window.data.getNewPhotos(flatsObj.offer.photos));
      return cardElement;
    }
  };
})();
