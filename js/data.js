'use strict';
(function () {
  window.data = {
    /**
     * Добавляет в ДОМ список li с классами, соответствующими массиву
     * @param {Array} array передаем массив features
     * @return {*} возвращаем featuresFragment
     */
    getNewFeatures: function (array) {
      var featuresFragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + array[i];
        featuresFragment.appendChild(li);
      }
      return featuresFragment;
    },
    /**
     * Добавляет в ДОМ img с src, соответствующими массиву
     * @param {Array} array передаем массив photos
     * @return {*} возвращаем photosFragment
     */
    getNewPhotos: function (array) {
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
    },
    /**
     * Функция создания массива данных для pins и cards
     * @return {array} Возвращает массив с данными
     */
    getNewData: function () {
      var newAvatars = AVATARS.sort(window.util.sortArray);
      for (var i = 0; i < PINS_QUANTITY; i++) {
        var x = window.util.randomInteger(X_MIN, X_MAX);
        var y = window.util.randomInteger(Y_MIN, Y_MAX);
        flats[i] = {
          author: newAvatars[i],
          offer:
          {
            title: window.util.getRandomElement(OFFER_TITLES),
            address: x + ', ' + y,
            price: window.util.randomInteger(PRICE_MIN, PRICE_MAX) + '₽/ночь',
            type: window.util.getRandomProperty(TYPES),
            rooms: window.util.randomInteger(ROOMS_MIN, ROOMS_MAX),
            guests: window.util.randomInteger(GUESTS_MIN, GUESTS_MAX),
            checkin: window.util.getRandomElement(CHECK),
            checkout: window.util.getRandomElement(CHECK),
            features: window.util.getRandomFeatures(FEATURES.sort(window.util.sortArray)),
            description: ' ',
            photos: PHOTOS.sort(window.util.sortArray)
          },
          location: {
            x: x,
            y: y
          }
        };
      }
      return flats;
    }
  };
})();
