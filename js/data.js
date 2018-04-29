'use strict';
(function () {
/*
  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var CHECK = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var X_MIN = 300;
  var X_MAX = 900;
  var Y_MIN = 150;
  var Y_MAX = 500;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
*/
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
    }
    /**
     * Функция создания массива данных для pins и cards
     */
    /* getNew: function () {
      var flats = [];
      var newAvatars = AVATARS.sort(window.util.sortArray);
      for (var i = 0; i < window.PINS_QUANTITY; i++) {
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
    }*/
  };
})();
