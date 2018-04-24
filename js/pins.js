'use strict';
(function () {
  window.PINS_QUANTITY = 8;
  window.PIN_X = 20;
  window.PIN_Y = 44;
  var mapPinsSimilar = document.querySelector('template').content.querySelector('.map__pin');
  window.pins = {
    /**
     * Функция отрисовки меток pins
     * @param {Array} dataArray Передаем массив данных для заполнения pins и cards
     */
    renderPins: function (dataArray) {
      var pinsFragment = document.createDocumentFragment();
      for (var quantity = 0; quantity < PINS_QUANTITY; quantity++) {
        var pinsElement = mapPinsSimilar.cloneNode(true);
        pinsElement.alt = 'Метка объявления';
        pinsElement.id = quantity;
        pinsElement.querySelector('img').src = dataArray[quantity].author;
        pinsElement.style = 'left: ' + parseInt(dataArray[quantity].location.x + PIN_X) + 'px; top: ' + parseInt(dataArray[quantity].location.y + PIN_Y) + 'px';
        pinsFragment.appendChild(pinsElement);
      }
      return pinsFragment;
    }
  };
})();