'use strict';
var PIN_X = 20;
var PIN_Y = 44;
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
var PINS_QUANTITY = 8;
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
var sortArray = function () {
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
 * @param {Object} flatsObj Передаем объект массива flats
 * @return {*} Возвращаем новую карточку, отрисованную на основе данных объекта из массива flats
 */
var renderNewCard = function (flatsObj) {
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
  cardElement.querySelector('ul').appendChild(getNewFeatures(flatsObj.offer.features));
  cardElement.querySelector('.popup__photos').appendChild(getNewPhotos(flatsObj.offer.photos));
  return cardElement;
};

newAvatars = AVATARS.sort(sortArray);

/**
 * Функция создания массива данных для pins и cards
 * @return {array} Возвращает массив с данными
 */
var getNewData = function () {
  for (var i = 0; i < PINS_QUANTITY; i++) {
    var x = randomInteger(X_MIN, X_MAX);
    var y = randomInteger(Y_MIN, Y_MAX);
    flats[i] = {
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
        features: getRandomFeatures(FEATURES.sort(sortArray)),
        description: ' ',
        photos: PHOTOS.sort(sortArray)
      },
      location: {
        x: x + PIN_X,
        y: y + PIN_Y
      }
    };
  }
  return flats;
};

var mapPinsList = document.querySelector('.map__pins');
var mapCardList = document.querySelector('.map');
var mapPinsSimilar = document.querySelector('template').content.querySelector('.map__pin');
var mapCardSimilar = document.querySelector('template').content.querySelector('.map__card');
var cardElement = mapCardSimilar.cloneNode(true);

var pinsFragment = document.createDocumentFragment();
/**
 * Функция отрисовки меток pins
 * @param {Array} dataArray Передаем массив данных для заполнения pins и cards
 */
var renderPins = function (dataArray) {
  for (var quantity = 0; quantity < PINS_QUANTITY; quantity++) {
    var pinsElement = mapPinsSimilar.cloneNode(true);
    pinsElement.alt = 'Метка объявления';
    pinsElement.id = quantity;
    pinsElement.querySelector('img').src = dataArray[quantity].author;
    pinsElement.style = 'left: ' + dataArray[quantity].location.x + 'px; top: ' + dataArray[quantity].location.y + 'px';
    pinsFragment.appendChild(pinsElement);
  }
};
getNewData();

var form = document.querySelector('.ad-form');
var fieldsetArray = form.querySelectorAll('fieldset');
var mapActivate = document.querySelector('.map__pin--main');
form.querySelector('fieldset:nth-child(3) > input').value = parseInt(mapActivate.style.left, 10) + ', ' + parseInt(mapActivate.style.top, 10);

form.querySelector('fieldset:nth-child(2) > input').required = true;
form.querySelector('fieldset:nth-child(2) > input').setAttribute('minlength', '30');
form.querySelector('fieldset:nth-child(2) > input').setAttribute('maxlength','100');

var inputFlatPrice = form.querySelector('fieldset:nth-child(5) > input');
inputFlatPrice.required = true;
inputFlatPrice.type = 'number';
inputFlatPrice.max = '1000000';

var flatType = form.querySelectorAll('fieldset:nth-child(4) > select > option');
var flatTypeButton = form.querySelector('fieldset:nth-child(4) > select');
flatTypeButton.addEventListener('click', function () {
  for (var i = 0; i < flatType.length; i++) {
    if (flatType[i].selected && flatType[i].value === 'bungalo') {
      inputFlatPrice.min = '0';
      inputFlatPrice.placeholder = '0';
    } else if (flatType[i].selected && flatType[i].value === 'flat') {
      inputFlatPrice.min = '1000';
      inputFlatPrice.placeholder = '1000';
    } else if (flatType[i].selected && flatType[i].value === 'house') {
      inputFlatPrice.min = '5000';
      inputFlatPrice.placeholder = '5000';
    } else if (flatType[i].selected && flatType[i].value === 'palace') {
      inputFlatPrice.min = '10000';
      inputFlatPrice.placeholder = '10000';
    }
  }
});

var timeIn = form.querySelectorAll('#timein > option');
var timeOut = form.querySelectorAll('#timeout > option');
var timeInButton = form.querySelector('#timein');

timeInButton.addEventListener('click', function () {
  for (var i = 0; i < timeIn.length; i++) {
    if (timeIn[i].selected && timeIn[i].value === '12:00') {
      timeOut[i].selected = 'true';
    } else if (timeIn[i].selected && timeIn[i].value === '13:00') {
      timeOut[i].selected = 'true';
    } else if (timeIn[i].selected && timeIn[i].value === '14:00') {
      timeOut[i].selected = 'true';
    }
  }
});

var roomNumber = form.querySelectorAll('#room_number > option');
var roomCapacity = form.querySelectorAll('#capacity > option');
var roomNumberButton = form.querySelector('#room_number');

roomCapacity[0].disabled = true; // 3 guest
roomCapacity[1].disabled = true; // 2 guest
roomCapacity[2].disabled = false; // 1 guest
roomCapacity[3].disabled = true; // 0 guest
roomCapacity[2].selected = 'true';

roomNumberButton.addEventListener('click', function () {
  for (var i = 0; i < roomNumber.length; i++) {
    if (roomNumber[i].selected && roomNumber[i].value === '1') {
      roomCapacity[0].disabled = true; // 3 guest
      roomCapacity[1].disabled = true; // 2 guest
      roomCapacity[2].disabled = false; // 1 guest
      roomCapacity[3].disabled = true; // 0 guest
      roomCapacity[2].selected = 'true';
    } else if (roomNumber[i].selected && roomNumber[i].value === '2') {
      roomCapacity[0].disabled = true;
      roomCapacity[1].disabled = false;
      roomCapacity[2].disabled = false;
      roomCapacity[3].disabled = true;
      roomCapacity[i].selected = 'true';
    } else if (roomNumber[i].selected && roomNumber[i].value === '3') {
      roomCapacity[0].disabled = false;
      roomCapacity[1].disabled = false;
      roomCapacity[2].disabled = false;
      roomCapacity[3].disabled = true;
      roomCapacity[i].selected = 'true';
    } else if (roomNumber[i].selected && roomNumber[i].value === '100') {
      roomCapacity[0].disabled = true;
      roomCapacity[1].disabled = true;
      roomCapacity[2].disabled = true;
      roomCapacity[3].disabled = false;
      roomCapacity[i].selected = 'true';
    }
  }
});

mapActivate.addEventListener('mouseup', function () {
  document.querySelector('.map').classList.remove('map--faded');
  form.querySelector('fieldset:nth-child(3) > input').value = parseInt(mapActivate.style.left, 10) + ', ' + parseInt(mapActivate.style.top, 10);
  form.classList.remove('ad-form--disabled');
  for (var n = 0; n < fieldsetArray.length; n++) {
    fieldsetArray[n].disabled = false;
  }
  renderPins(flats);
  mapPinsList.appendChild(pinsFragment);
  mapCardList.appendChild(renderNewCard(flats[0]));
});

mapActivate.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapActivate.style.top = (mapActivate.offsetTop - shift.y) + 'px';
    mapActivate.style.left = (mapActivate.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

mapPinsList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName === 'BUTTON') {
    renderNewCard(flats[target.id]);
    cardElement.classList.remove('hidden');
  } else if (target.tagName === 'IMG') {
    renderNewCard(flats[target.parentElement.id]);
    cardElement.classList.remove('hidden');
  }
});

cardElement.querySelector('.popup__close').addEventListener('click', function () {
  cardElement.classList.add('hidden');
});


