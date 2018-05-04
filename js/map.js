'use strict';
(function () {

  var ESC_KEYCODE = 27;

  var mapPinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  window.mapPinsContainer = mapPinsContainer;

  /**
   * Отрисовывает карточку, по данным одной метки
   * @param {Object} obj передаем данные одной метки
   */
  var showTheCard = function (obj) {
    map.appendChild(window.card.render(obj));
  };

  mapPinsContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON' && target.className !== 'map__pin map__pin--main') {
      showTheCard(window.pinsData[target.id]);
    } else if (target.tagName === 'IMG' && target.parentElement.className !== 'map__pin map__pin--main') {
      showTheCard(window.pinsData[target.parentElement.id]);
    }
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === ESC_KEYCODE) {
        window.card.remove();
        document.querySelector('.success').classList.add('hidden');
      }
    });
  });
})();

