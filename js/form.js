'use strict';
(function () {
  var MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var titleForm = window.form.querySelector('#title');
  titleForm.required = true;
  titleForm.setAttribute('minlength', '30');
  titleForm.setAttribute('maxlength', '100');

  var inputFlatPrice = window.form.querySelector('#price');
  inputFlatPrice.required = true;
  inputFlatPrice.max = '1000000';
  inputFlatPrice.placeholder = 0;

  var flatTypeButton = window.form.querySelector('#type');

  flatTypeButton.addEventListener('change', function () {
    var typePrice = flatTypeButton.value;
    inputFlatPrice.min = MIN_PRICES[typePrice];
    inputFlatPrice.placeholder = MIN_PRICES[typePrice];
  });

  var timeIn = window.form.querySelector('#timein');
  var timeOut = window.form.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    var selectedTimeIn = timeIn.value;
    timeOut.value = selectedTimeIn;
  });

  timeOut.addEventListener('change', function () {
    var selectedTimeOut = timeOut.value;
    timeIn.value = selectedTimeOut;
  });

  var roomNumber = window.form.querySelector('#room_number');
  var roomCapacity = window.form.querySelector('#capacity');

  roomCapacity[0].disabled = true; // 3 guest
  roomCapacity[1].disabled = true; // 2 guest
  roomCapacity[2].disabled = false; // 1 guest
  roomCapacity[3].disabled = true; // 0 guest
  roomCapacity[2].selected = true;

  roomNumber.addEventListener('change', function () {
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
})();
