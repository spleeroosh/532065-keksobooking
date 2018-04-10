'use strict';
document.querySelector('.map').classList.remove('map--faded');
var mapPinsList = document.querySelector('.map__pins');
var mapCardList = document.querySelector('.map');
var mapPinsSimilar = document.querySelector('template').content.querySelector('.map__pin');
var mapCardSimilar = document.querySelector('template').content.querySelector('.map__card');
var PIN_X = 10;
var PIN_Y = 30;
var MIN_ARRAY_LENGTH = 0;
var flats = [];
var newAvatars = [];
var newFeatures = [];
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

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

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

/**
 * Нахождение случайного числа в диапазоне
 * @param {number} min минимальное число в диапазоне
 * @param {number} max максимальное число в диапазоне
 * @return {number} Возвращаем случайное число в диапазоне от min до max
 */
var randomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

/**
 * Нахождение случайного элемента в массиве
 * @param {Array} array передаем массив данных
 * @return {*} возвращаем случайный элемент массива
 */
var getRandomElement = function (array) {
  return array[randomInteger(MIN_ARRAY_LENGTH, array.length - 1)];
};

/**
 * Получаем и обрабатываем массив FEATURES
 * @param {Array} array
 * @return {Array} Возвращаем случайный массив из предложенных элементов массива FEATURES
 */
var getRandomFeatures = function (array) {
  var randomFeatures = [];
  for (var i = 0; i < randomInteger(1, array.length); i++) {
    randomFeatures[i] = array[i];
  }
  return randomFeatures;
};

/**
 * Сортируем массив случайным образом
 * @param {Array} array передаем массив с фотографиями
 * @return {Array} возвращаем отсортированный, в случайном порядке, массив
 */
var getRandomArray = function () {
  return Math.random() - 0.5;
};

/**
 * Добавляет в ДОМ список li с классами, соответствующими массиву
 * @param {Array} array передаем массив features
 * @return {*} возвращаем featuresFragment
 */
var getNewFeatures = function (array) {
  var featuresFragment = document.createDocumentFragment();
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
    img.alt= 'Фотография жилья';
    photosFragment.appendChild(img);
  }
  return photosFragment;
};

newAvatars = AVATARS.sort(getRandomArray);

var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  var pinsElement = mapPinsSimilar.cloneNode(true);
  var x = randomInteger(300, 900);
  var y = randomInteger(150, 500);

  newFeatures[i] = getRandomFeatures(FEATURES);
  flats[i] = {
    'author': newAvatars[i],
    'offer':
    {
      'title': getRandomElement(OFFER_TITLES),
      'address': x + ', ' + y,
      'price': randomInteger(1000, 1000000) + '₽/ночь',
      'type': getRandomElement(TYPES),
      'rooms': randomInteger(1, 5),
      'guests': randomInteger(1, 10),
      'checkin': getRandomElement(CHECK),
      'checkout': getRandomElement(CHECK),
      'features': newFeatures[i],
      'description': ' ',
      'photos': PHOTOS.sort(getRandomArray)
    },
    'location': {
      'x': x + PIN_X,
      'y': y + PIN_Y
    }

  };
  pinsElement.alt = 'Метка объявления';
  pinsElement.querySelector('img').src = flats[i].author;
  pinsElement.style = 'left: ' + flats[i].location.x + 'px; top: ' + flats[i].location.y + 'px';
  fragment.appendChild(pinsElement);
}
mapPinsList.appendChild(fragment);

var cardElement = mapCardSimilar.cloneNode(true);
cardElement.querySelector('img').src = flats[0].author;
cardElement.querySelector('.popup__text--address').textContent = flats[0].offer.address;
cardElement.querySelector('.popup__title').textContent = flats[0].offer.title;
cardElement.querySelector('.popup__text--price').textContent = flats[0].offer.price;
cardElement.querySelector('.popup__type').textContent = flats[0].offer.type;
cardElement.querySelector('.popup__text--capacity').textContent = flats[0].offer.rooms + ' комнаты для ' + flats[0].offer.guests + ' гостей.';
cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + flats[0].offer.checkin + ', выезд до ' + flats[0].offer.checkout;
cardElement.querySelector('.popup__description').textContent = flats[0].offer.description;
cardElement.querySelector('.popup__features').textContent = '';
cardElement.querySelector('.popup__photos').textContent = '';
mapCardList.appendChild(cardElement);
cardElement.querySelector('ul').appendChild(getNewFeatures(newFeatures[0]));
cardElement.querySelector('.popup__photos').appendChild(getNewPhotos(flats[0].offer.photos));

