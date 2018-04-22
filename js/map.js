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

var MIN_PRICES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
}


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

/**
 * Функция создания массива данных для pins и cards
 * @return {array} Возвращает массив с данными
 */
var getNewData = function () {
  var newAvatars = AVATARS.sort(sortArray);
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
        x: x,
        y: y
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

/**
 * Функция отрисовки меток pins
 * @param {Array} dataArray Передаем массив данных для заполнения pins и cards
 */
var renderPins = function (dataArray) {
  var pinsFragment = document.createDocumentFragment();
  for (var quantity = 0; quantity < PINS_QUANTITY; quantity++) {
    var pinsElement = mapPinsSimilar.cloneNode(true);
    pinsElement.alt = 'Метка объявления';
    pinsElement.id = quantity;
    pinsElement.querySelector('img').src = dataArray[quantity].author;
    pinsElement.style = `left: ${dataArray[quantity].location.x + PIN_X}px; top: ${dataArray[quantity].location.y + PIN_Y}px`;
    pinsFragment.appendChild(pinsElement);
  }
  return pinsFragment;
};

var flats = [];
getNewData();
//////////////////Валидация форм/////////////////////
var form = document.querySelector('.ad-form');
var fieldsetArray = form.querySelectorAll('fieldset');
var mapActivate = document.querySelector('.map__pin--main');
form.querySelector('#address').value = parseInt(mapActivate.style.left + PIN_X, 10)  + ', ' + parseInt(mapActivate.style.top + PIN_Y, 10) ;

var titleForm = form.querySelector('#title');
titleForm.required = true;
titleForm.setAttribute('minlength', '30');
titleForm.setAttribute('maxlength', '100');

var inputFlatPrice = form.querySelector('#price');
inputFlatPrice.required = true;
inputFlatPrice.type = 'number';
inputFlatPrice.max = '1000000';
inputFlatPrice.placeholder = 0;

var flatTypeButton = form.querySelector('#type');

flatTypeButton.addEventListener('change', function () {
 var typePrice = flatTypeButton.value;
 inputFlatPrice.min = MIN_PRICES[typePrice];
 inputFlatPrice.placeholder = MIN_PRICES[typePrice];
});

var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', function () {
  var selectedTimeIn = timeIn.value
  timeOut.value = selectedTimeIn;
});

timeOut.addEventListener('change', function () {
  var selectedTimeOut = timeOut.value
  timeIn.value = selectedTimeOut;
});

var roomNumber = form.querySelector('#room_number');
var roomCapacity = form.querySelector('#capacity');

roomCapacity[0].disabled = true; // 3 guest
roomCapacity[1].disabled = true; // 2 guest
roomCapacity[2].disabled = false; // 1 guest
roomCapacity[3].disabled = true; // 0 guest
roomCapacity[2].selected = true;

roomNumber.addEventListener('change', function (evt) {
  var selectedRoomNumber = roomNumber.value;
  if (selectedRoomNumber === '1') {
      roomCapacity[0].disabled = true; // 3 guest
      roomCapacity[1].disabled = true; // 2 guest
      roomCapacity[2].disabled = false; // 1 guest
      roomCapacity[3].disabled = true; // 0 guest
      roomCapacity[2].selected = true;
    } else if (selectedRoomNumber === '2') {
      roomCapacity[0].disabled = true;
      roomCapacity[1].disabled = false;
      roomCapacity[2].disabled = false;
      roomCapacity[3].disabled = true;
      roomCapacity[1].selected = true;
    } else if (selectedRoomNumber === '3') {
      roomCapacity[0].disabled = false;
      roomCapacity[1].disabled = false;
      roomCapacity[2].disabled = false;
      roomCapacity[3].disabled = true;
      roomCapacity[0].selected = true;
    } else if (selectedRoomNumber === '100') {
      roomCapacity[0].disabled = true;
      roomCapacity[1].disabled = true;
      roomCapacity[2].disabled = true;
      roomCapacity[3].disabled = false;
      roomCapacity[3].selected = true;
    }
});
//////////////////////Ивент_листнеры/////////////////////////////
mapActivate.addEventListener('mouseup', function () {
  document.querySelector('.map').classList.remove('map--faded');
  form.querySelector('#address').value = parseInt(mapActivate.style.left + PIN_X, 10) + ', ' + parseInt(mapActivate.style.top + PIN_Y, 10);
  form.classList.remove('ad-form--disabled');
  for (var n = 0; n < fieldsetArray.length; n++) {
    fieldsetArray[n].disabled = false;
  }
  mapPinsList.appendChild(renderPins(flats));
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

    if ((mapActivate.offsetLeft - shift.x) >= 1150) {
      document.removeEventListener('mousemove', onMouseMove);
      mapActivate.style.left = 1150 + 'px';
    }

    if ((mapActivate.offsetLeft - shift.x <= 0)) {
      document.removeEventListener('mousemove', onMouseMove);
      mapActivate.style.left = 0 + 'px';
    }

    if ((mapActivate.offsetTop - shift.y) >= 620) {
      document.removeEventListener('mousemove', onMouseMove);
      mapActivate.style.top = 620 + 'px';
    }

    if ((mapActivate.offsetTop - shift.y <= 100 )) {
      document.removeEventListener('mousemove', onMouseMove);
      mapActivate.style.top = 100 + 'px';
    }
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
    mapCardList.appendChild(renderNewCard(flats[target.id]));
    cardElement.classList.remove('hidden');
  } else if (target.tagName === 'IMG') {
    mapCardList.appendChild(renderNewCard(flats[target.parentElement.id]));
    cardElement.classList.remove('hidden');
  }
});

cardElement.querySelector('.popup__close').addEventListener('click', function () {
  cardElement.classList.add('hidden');
});




