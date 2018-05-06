'use strict';
(function () {

  var MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var MAX_PRICE = '1000000';
  var MIN_LENGTH = '30';
  var MAX_LENGTH = '100';

  var form = document.querySelector('.ad-form');
  window.form = form;

  var titleForm = form.querySelector('#title');
  titleForm.required = true;
  titleForm.setAttribute('minlength', MIN_LENGTH);
  titleForm.setAttribute('maxlength', MAX_LENGTH);

  var inputFlatPrice = form.querySelector('#price');
  inputFlatPrice.required = true;
  inputFlatPrice.max = MAX_PRICE;
  inputFlatPrice.placeholder = MIN_PRICES.bungalo;

  var flatTypeButton = form.querySelector('#type');
  flatTypeButton.addEventListener('change', function () {
    var typePrice = flatTypeButton.value;
    inputFlatPrice.min = MIN_PRICES[typePrice];
    inputFlatPrice.placeholder = MIN_PRICES[typePrice];
  });

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    var selectedTimeIn = timeIn.value;
    timeOut.value = selectedTimeIn;
  });

  timeOut.addEventListener('change', function () {
    var selectedTimeOut = timeOut.value;
    timeIn.value = selectedTimeOut;
  });

  var roomNumber = form.querySelector('#room_number');
  var roomCapacity = form.querySelector('#capacity');

  for (var i = 0; i < roomCapacity.length; i++) {
    if (roomCapacity[i].value === '1') {
      roomCapacity[i].disabled = false;
      roomCapacity[i].selected = true;
    } else {
      roomCapacity[i].disabled = true;
    }
  }

  /**
   * Функция определения выбранного селекта количества комнат.
   * @param {Number} room количество комнат у выбранного селекта
   * @param {Number} capacity количество мест в комнатах
   * @return {Boolean} Возвращает true, если комнат 100.
   */
  function isRoomNumber100(room, capacity) {
    return (room === '100' && capacity === '0');
  }

  /**
   * Функция определения выбранного селекта количества комнат.
   * @param {Number} room количество комнат у выбранного селекта
   * @param {Number} capacity количество мест в комнатах
   * @return {Boolean} Возвращает true, если комнат не 100.
   */
  function isRoomNumber123(room, capacity) {
    return (room >= capacity && capacity !== '0' && room !== '100');
  }

  roomNumber.addEventListener('change', function () {
    var selectedRoomNumber = roomNumber.value;
    for (var n = 0; n < roomCapacity.length; n++) {
      if (isRoomNumber123(selectedRoomNumber, roomCapacity[n].value) || isRoomNumber100(selectedRoomNumber, roomCapacity[n].value)) {
        roomCapacity[n].disabled = false;
        roomCapacity[n].selected = true;
      } else {
        roomCapacity[n].disabled = true;
      }
    }
  });

  form.addEventListener('submit', function (evt) {
    window.backend.upload(window.formReset, window.errorHandler, new FormData(form));
    evt.preventDefault();
  });

  form.addEventListener('reset', function (evt) {
    window.formReset();
    evt.preventDefault();
  });
})();
