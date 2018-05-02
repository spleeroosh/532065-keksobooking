'use strict';
(function () {
  var PIN_X = 25;
  var PIN_Y = 70;
  window.PIN_X = PIN_X;
  window.PIN_Y = PIN_Y;
  var mapPinsSimilar = document.querySelector('template').content.querySelector('.map__pin');
  window.pinsData = [];
  window.pins = {

    remove: function () {
      var mapContainerNode = window.mapPinsContainer.querySelectorAll('button');
      /**
       * Убираем метки с карты, при изменении фильтров
       */
      mapContainerNode.forEach(function (it) {
        if (it.className !== 'map__pin map__pin--main') {
          window.mapPinsContainer.removeChild(it);
        }
      });
    },

    /**
     * Функция отрисовки меток pins
     * @param {Array} dataArray Передаем массив данных для заполнения pins и cards
     * @param {Number} pinsQuantity Получаем количество меток, которых нужно отрисовать
     * @return {*} Возвращаем pinsFragment с готовыми метками
     */
    render: function (dataArray, pinsQuantity) {
      window.pinsData = dataArray.sort(window.util.sortArray).filter(function (pin, index) {
        return index < pinsQuantity;
      });

      var pinsFragment = document.createDocumentFragment();
      for (var quantity = 0; quantity < window.pinsData.length; quantity++) {
        var pinsElement = mapPinsSimilar.cloneNode(true);
        pinsElement.alt = 'Метка объявления';
        pinsElement.id = quantity;
        pinsElement.value = window.pinsData[quantity].offer.type;
        pinsElement.querySelector('img').src = window.pinsData[quantity].author.avatar;
        pinsElement.style = 'left: ' + parseInt(window.pinsData[quantity].location.x - PIN_X, 10) + 'px; top: ' + parseInt(window.pinsData[quantity].location.y - PIN_Y, 10) + 'px';
        pinsFragment.appendChild(pinsElement);
      }
      return pinsFragment;
    }
  };
})();
