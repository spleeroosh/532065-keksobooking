'use strict';
(function () {

  window.MIN_ARRAY_LENGTH = 0;

  var mapPinsList = document.querySelector('.map__pins');
  var mapCardList = document.querySelector('.map');
  window.mapPinsList = mapPinsList;
  window.mapCardList = mapCardList;

  window.data.getNew();

  mapPinsList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON' && target.className != 'map__pin map__pin--main') {
      mapCardList.appendChild(window.card.renderNew(window.flats[target.id]));
    } else if (target.tagName === 'IMG' && target.parentElement.className != 'map__pin map__pin--main') {
      mapCardList.appendChild(window.card.renderNew(window.flats[target.parentElement.id]));
    }
  });
})();

