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

  roomNumber.addEventListener('change', function () {
    var selectedRoomNumber = roomNumber.value;
    for (var n = 0; n < roomCapacity.length; n++) {
      if (selectedRoomNumber >= roomCapacity[n].value && roomCapacity[n].value !== '0' && selectedRoomNumber !== '100'
      || selectedRoomNumber === '100' && roomCapacity[n].value === '0') {
        roomCapacity[n].disabled = false;
        roomCapacity[n].selected = true;
      } else {
        roomCapacity[n].disabled = true;
      }
    }
  });

  form.addEventListener('submit', function (evt) {
    window.backend.upload(window.formReset, window.errorHandler, new FormData(form));
    document.querySelector('.success').classList.remove('hidden');
    evt.preventDefault();
  });

  form.addEventListener('reset', function (evt) {
    window.formReset();
    evt.preventDefault();
  });
})();
