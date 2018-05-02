'use strict';
(function () {

  var TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var mapCardSimilar = document.querySelector('template').content.querySelector('.map__card');
  var cardElement = mapCardSimilar.cloneNode(true);

  /**
   * Добавляет в ДОМ список li с классами, соответствующими массиву
   * @param {Array} array передаем массив features
   * @return {*} возвращаем featuresFragment
   */
  var getNewFeatures = function (array) {
    var featuresFragment = document.createDocumentFragment();
    array.sort(window.util.sortArray);
    for (var i = 0; i < array.length; i++) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + array[i];
      featuresFragment.appendChild(li);
    }
    return featuresFragment;
  };

  /**
   * Добавляет в ДОМ img с src, соответствующими массиву
   * @param {Array} array передаем массив photos
   * @return {*} возвращаем photosFragment
   */
  var getNewPhotos = function (array) {
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = array[i];
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья';
      photosFragment.appendChild(img);
    }
    return photosFragment;
  };

  window.card = {
    remove: function () {
      cardElement.classList.add('hidden');
    },
    /**
     * Функция отрисовки новой карточки
     * @param {Object} flatsObj Передаем объект массива flats
     * @return {*} Возвращаем новую карточку, отрисованную на основе данных объекта из массива flats
     */
    render: function (flatsObj) {
      cardElement.querySelector('img').src = flatsObj.author.avatar;
      cardElement.querySelector('.popup__text--address').textContent = flatsObj.offer.address;
      cardElement.querySelector('.popup__title').textContent = flatsObj.offer.title;
      cardElement.querySelector('.popup__text--price').textContent = flatsObj.offer.price;
      cardElement.querySelector('.popup__type').textContent = TYPES[flatsObj.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = flatsObj.offer.rooms + ' комнаты для ' + flatsObj.offer.guests + ' гостей.';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + flatsObj.offer.checkin + ', выезд до ' + flatsObj.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = flatsObj.offer.description;
      cardElement.querySelector('.popup__features').textContent = '';
      cardElement.querySelector('.popup__photos').textContent = '';
      cardElement.querySelector('ul').appendChild(getNewFeatures(flatsObj.offer.features));
      cardElement.querySelector('.popup__photos').appendChild(getNewPhotos(flatsObj.offer.photos));
      cardElement.classList.remove('hidden');
      cardElement.querySelector('.popup__close').addEventListener('click', function () {
        window.card.remove();
      });
      return cardElement;
    }
  };
})();
