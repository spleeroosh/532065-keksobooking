'use strict';
(function () {
  var PINS_QUANTITY = 8;
  var PIN_X = 20;
  var PIN_Y = 44;
  window.PINS_QUANTITY = PINS_QUANTITY;
  window.PIN_X = PIN_X;
  window.PIN_Y = PIN_Y;
  var mapPinsSimilar = document.querySelector('template').content.querySelector('.map__pin');
  window.pins = {
    /**
     * Функция отрисовки меток pins
     * @param {Array} dataArray Передаем массив данных для заполнения pins и cards
     * @return {*} Возвращаем pinsFragment с готовыми метками
     */
    render: function (dataArray) {
      var pinsFragment = document.createDocumentFragment();
      for (var quantity = 0; quantity < PINS_QUANTITY; quantity++) {
        var pinsElement = mapPinsSimilar.cloneNode(true);
        pinsElement.alt = 'Метка объявления';
        pinsElement.id = quantity;
        pinsElement.querySelector('img').src = dataArray[quantity].author;
        pinsElement.style = 'left: ' + parseInt(dataArray[quantity].location.x + PIN_X, 10) + 'px; top: ' + parseInt(dataArray[quantity].location.y + PIN_Y, 10) + 'px';
        pinsFragment.appendChild(pinsElement);
      }
      return pinsFragment;
    }
  };
})();
