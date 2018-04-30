'use strict';
(function () {
  var MAX_LEFT = 1150;
  var MAX_TOP = 620;
  var MIN_LEFT = 0;
  var MIN_TOP = 100;
  var mapActivate = document.querySelector('.map__pin--main');
  window.form.querySelector('#address').value = parseInt(mapActivate.style.left + window.PIN_X, 10) + ', ' + parseInt(mapActivate.style.top + window.PIN_Y, 10);
  var fieldsetArray = window.form.querySelectorAll('fieldset');

  mapActivate.addEventListener('mouseup', function () {
    document.querySelector('.map').classList.remove('map--faded');
    window.form.querySelector('#address').value = parseInt(mapActivate.style.left + window.PIN_X, 10) + ', ' + parseInt(mapActivate.style.top + window.PIN_Y, 10);
    window.form.classList.remove('ad-form--disabled');
    for (var n = 0; n < fieldsetArray.length; n++) {
      fieldsetArray[n].disabled = false;
    }
    var successHandlerForPins = function (nData) {
      window.mapPinsContainer.appendChild(window.pins.render(nData));
    };
    window.backend.download(successHandlerForPins, window.errorHandler);
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

      if ((mapActivate.offsetLeft - shift.x) >= MAX_LEFT) {
        mapActivate.style.left = MAX_LEFT + 'px';
      }

      if ((mapActivate.offsetLeft - shift.x <= 0)) {
        mapActivate.style.left = MIN_LEFT + 'px';
      }

      if ((mapActivate.offsetTop - shift.y) >= MAX_TOP) {
        mapActivate.style.top = MAX_TOP + 'px';
      }

      if ((mapActivate.offsetTop - shift.y <= 100)) {
        mapActivate.style.top = MIN_TOP + 'px';
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
})();

