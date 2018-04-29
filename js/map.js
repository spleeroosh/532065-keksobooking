'use strict';
(function () {
  window.MIN_ARRAY_LENGTH = 0;

  var mapPinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  window.mapPinsContainer = mapPinsContainer;

  mapPinsContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    var successHandlerForCard = function (nData) {
      if (target.tagName === 'BUTTON' && target.className != 'map__pin map__pin--main') {
        map.appendChild(window.card.render(nData[target.id]));
      } else if (target.tagName === 'IMG' && target.parentElement.className != 'map__pin map__pin--main') {
        map.appendChild(window.card.render(nData[target.parentElement.id]));
      }
    };
    window.backend.download(successHandlerForCard, window.errorHandler);
  });
})();

