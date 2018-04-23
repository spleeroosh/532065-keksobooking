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

var mapPinsList = document.querySelector('.map__pins');
var mapCardList = document.querySelector('.map');
var mapPinsSimilar = document.querySelector('template').content.querySelector('.map__pin');
var mapCardSimilar = document.querySelector('template').content.querySelector('.map__card');
var cardElement = mapCardSimilar.cloneNode(true);
var flats = [];
window.data.getNewData();
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
  //console.log(roomCapacity[selectedRoomNumber]);

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
  mapPinsList.appendChild(window.pins.renderPins(flats));
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
      mapActivate.style.left = 1150 + 'px';
    }

    if ((mapActivate.offsetLeft - shift.x <= 0)) {
      mapActivate.style.left = 0 + 'px';
    }

    if ((mapActivate.offsetTop - shift.y) >= 620) {
      mapActivate.style.top = 620 + 'px';
    }

    if ((mapActivate.offsetTop - shift.y <= 100 )) {
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
    mapCardList.appendChild(window.card.renderNewCard(flats[target.id]));
    cardElement.classList.remove('hidden');
  } else if (target.tagName === 'IMG') {
    mapCardList.appendChild(window.card.renderNewCard(flats[target.parentElement.id]));
    cardElement.classList.remove('hidden');
  }
});



