'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');

  var filterData = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: 'none',
    dishwasher: 'none',
    parking: 'none',
    washer: 'none',
    elevator: 'none',
    conditioner: 'none'
  };

/**
 * Фильтрует метки
 * @param {DOMElement} target Объект, на который кликнули
 * @param {Object} filters Массив фильтров, примененных к меткам
 * @return {Array} Возвращаем массив отфильтрованных меток
 */
var mapFilter = function (target, filters) {

  if (target.tagName === 'INPUT') {
    var filterKey = target.id.replace('filter-', '');
    if (filterData[filterKey] === 'none') {
      filterData[filterKey] = filterKey;
    } else {
      filterData[filterKey] = 'none';
    }
  } else {
    var filterKey = target.id.replace('housing-', '');
    filterData[filterKey] = target.value;
  }


  var filteredPins = [];

  Object.keys(filterData).forEach(function (key) {

    if (key === 'type') {
      if (filterData[key] === 'any') {
        filteredPins = window.flatsData;
      } else {
        filteredPins = window.flatsData.filter(function (pin) {
          return pin.offer[key] === filterData[key];
        });
      }
    } else if (key === 'price') {
      if (filterData[key] === 'any') {
        filteredPins = filteredPins;
      } else {
        filteredPins = filteredPins.filter(function (pin) {
          if (filterData[key] === 'middle') {
            return  pin.offer[key] > 10000  && pin.offer[key] < 50000;
          } else if (filterData[key] === 'low') {
            return pin.offer[key] < 10000;
          } else if (filterData[key] === 'high') {
            return pin.offer[key] > 50000;
          }
        });
      }
    } else if (key === 'rooms' || key === 'guests') {
      if (filterData[key] === 'any') {
        filteredPins = filteredPins;
      } else {
        filteredPins = filteredPins.filter(function (pin) {
          return pin.offer[key] === +filterData[key];
        });
      }
    } else {
      if (filterData[key] === 'none') {
        filteredPins = filteredPins;
      } else {
        filteredPins = filteredPins.filter(function (pin) {
          for (var i = 0; i < pin.offer.features.length; i++) {
            if (pin.offer.features[i] === filterData[key]) {
              return true;
            }
          }
        });
      }
    }
  });
  return filteredPins;
};

filtersForm.addEventListener('change', function (evt) {

  var target = evt.target;

  var mapContainerNode = mapPinsContainer.querySelectorAll('button');
  window.card.remove();
  mapContainerNode.forEach(function (it) {
    if (it.className !== 'map__pin map__pin--main') {
      mapPinsContainer.removeChild(it);
    }
  });

  if (target.tagName === 'SELECT' || target.tagName === 'INPUT') {
      window.mapPinsContainer.appendChild(window.pins.render(mapFilter(target, filterData)));
  };

});
})();
