'use strict';
var PIN_X = 10;
var PIN_Y = 30;
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
var MIN_ARRAY_LENGTH = 0;
var mapPinsList = document.querySelector('.map__pins');
var mapCardList = document.querySelector('.map');
var mapPinsSimilar = document.querySelector('template').content.querySelector('.map__pin');
var mapCardSimilar = document.querySelector('template').content.querySelector('.map__card');
var cardElement = mapCardSimilar.cloneNode(true);
var flats = [];
var newAvatars = [];
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

/**
 * Нахождение случайного свойства в массиве
 * @param {object} obj Передаем объект в функцию
 * @return {*} Возвращаем случайное свойство из объекта
 */
var getRandomProperty = function (obj) {
  var randomProperty;
  var count = 0;
  for (var key in obj) {
    if (Math.random() < 1 / ++count) {
      randomProperty = obj[key];
    }
  }
  return randomProperty;
};

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
 * Передаем функию в метод sort, для сортировки массива
 * @return {number} возвращаем случайное число в диапазоне
 */
var getRandom = function () {
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
    img.alt = 'Фотография жилья';
    photosFragment.appendChild(img);
  }
  return photosFragment;
};
/**
 * Функция отрисовки новой карточки
 * @param {number} pinId Передаем id пина, массивом данных которого, нужно заполнить новую карту
 * @return {*} Возвращаем новую карточку
 */
var getNewCard = function (pinId) {
  cardElement.querySelector('img').src = flats[pinId].author;
  cardElement.querySelector('.popup__text--address').textContent = flats[pinId].offer.address;
  cardElement.querySelector('.popup__title').textContent = flats[pinId].offer.title;
  cardElement.querySelector('.popup__text--price').textContent = flats[pinId].offer.price;
  cardElement.querySelector('.popup__type').textContent = flats[pinId].offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = flats[pinId].offer.rooms + ' комнаты для ' + flats[pinId].offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + flats[pinId].offer.checkin + ', выезд до ' + flats[pinId].offer.checkout;
  cardElement.querySelector('.popup__description').textContent = flats[pinId].offer.description;
  cardElement.querySelector('.popup__features').textContent = '';
  cardElement.querySelector('.popup__photos').textContent = '';
  cardElement.querySelector('ul').appendChild(getNewFeatures(flats[pinId].offer.features));
  cardElement.querySelector('.popup__photos').appendChild(getNewPhotos(flats[pinId].offer.photos));
  return cardElement;
}

newAvatars = AVATARS.sort(getRandom);
var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  var pinsElement = mapPinsSimilar.cloneNode(true);
  var x = randomInteger(X_MIN, X_MAX);
  var y = randomInteger(Y_MIN, Y_MAX);
  flats[i] = {
    flatIndex: i,
    author: newAvatars[i],
    offer:
    {
      title: getRandomElement(OFFER_TITLES),
      address: x + ', ' + y,
      price: randomInteger(PRICE_MIN, PRICE_MAX) + '₽/ночь',
      type: getRandomProperty(TYPES),
      rooms: randomInteger(ROOMS_MIN, ROOMS_MAX),
      guests: randomInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomElement(CHECK),
      checkout: getRandomElement(CHECK),
      features: getRandomFeatures(FEATURES.sort(getRandom)),
      description: ' ',
      photos: PHOTOS.sort(getRandom)
    },
    location: {
      x: x + PIN_X,
      y: y + PIN_Y
    }

  };
  pinsElement.alt = 'Метка объявления';
  pinsElement.id = i;
  pinsElement.querySelector('img').src = flats[i].author;
  pinsElement.style = 'left: ' + flats[i].location.x + 'px; top: ' + flats[i].location.y + 'px';
  fragment.appendChild(pinsElement);
}

var form = document.querySelector('.ad-form')
var fieldsetArray = form.querySelectorAll('fieldset');
var mapActivate = document.querySelector('.map__pin--main');
form.querySelector('fieldset:nth-child(3) > input').placeholder = mapActivate.style.cssText.replace(/\D+/g," ");

mapActivate.addEventListener('mouseup', function (){
  document.querySelector('.map').classList.remove('map--faded');
  form.querySelector('fieldset:nth-child(3) > input').placeholder = mapActivate.style.cssText.replace(/\D+/g," ");
  form.classList.remove('ad-form--disabled');
  for(var i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].disabled = false;
  }
  mapPinsList.appendChild(fragment);
  mapCardList.appendChild(getNewCard(0));
})

mapPinsList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName == 'BUTTON') {
  getNewCard(target.id);
  return;
}
});

cardElement.querySelector('.popup__close').addEventListener('click', function () {
  cardElement.classList.add('hidden');
});

mapPinsList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName == 'BUTTON') {
  cardElement.classList.remove('hidden');
  }
});
