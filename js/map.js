'use strict';
(function () {
  window.MIN_ARRAY_LENGTH = 0;

  var mapPinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  window.mapPinsContainer = mapPinsContainer;

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
  });
})();

