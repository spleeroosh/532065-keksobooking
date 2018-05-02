'use strict';
(function () {

  var MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var form = document.querySelector('.ad-form');
  window.form = form;

  var titleForm = form.querySelector('#title');
  titleForm.required = true;
  titleForm.setAttribute('minlength', '30');
  titleForm.setAttribute('maxlength', '100');

  var inputFlatPrice = form.querySelector('#price');
  inputFlatPrice.required = true;
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
    for (var i = 0; i < roomCapacity.length; i++) {
      if (selectedRoomNumber >= roomCapacity[i].value && roomCapacity[i].value !== '0' && selectedRoomNumber !== '100') {
        roomCapacity[i].disabled = false;
        roomCapacity[i].selected = true;
      } else if (selectedRoomNumber === '100' & roomCapacity[i].value === '0') {
        roomCapacity[i].disabled = false;
        roomCapacity[i].selected = true;
      } else {
        roomCapacity[i].disabled = true;
      }
    }
  });

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), window.formReset, window.errorHandler);
    document.querySelector('.success').classList.remove('hidden');
    evt.preventDefault();
  });

  form.addEventListener('reset', function (evt) {
    window.formReset();
    evt.preventDefault();
  });
})();
