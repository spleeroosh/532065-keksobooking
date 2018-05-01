'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');

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

  var filteredPins = [];

  /**
   * Фильрует метки по типу жилья
   * @param {String} key передаем ключ состояния фильтра
   * @param {Array} filters передаем массив с ключами состояния фильров
   * @return {Array} возвращаем отфильтрованный массив объектов по типу жилья
   */
  var typeFilter = function (key, filters) {
    if (filters[key] === 'any') {
      return window.flatsData;
    } else {
      return window.flatsData.filter(function (pin) {
        return pin.offer[key] === filters[key];
      });
    }
  };

  /**
   * Фильрует метки по цене
   * @param {String} key передаем ключ состояния фильтра
   * @param {Array} filters передаем массив с ключами состояния фильров
   * @return {Array} возвращаем отфильтрованный массив объектов по цене
   */
  var priceFilter = function (key, filters) {
    if (filters[key] === 'any') {
      return filteredPins;
    } else {
      return filteredPins.filter(function (pin) {
        if (filters[key] === 'middle') {
          return pin.offer[key] > 10000 && pin.offer[key] < 50000;
        } else if (filters[key] === 'low') {
          return pin.offer[key] < 10000;
        } else if (filters[key] === 'high') {
          return pin.offer[key] > 50000;
        }
      });
    }
  };

  /**
   * Фильрует метки по количеству комнат или количеству гостей
   * @param {String} key передаем ключ состояния фильтра
   * @param {Array} filters передаем массив с ключами состояния фильров
   * @return {Array} возвращаем отфильтрованный массив объектов по количеству комнат или количеству гостей
   */
  var roomsAndGuestsFilter = function (key, filters) {
    if (filters[key] === 'any') {
      return filteredPins;
    } else {
      return filteredPins.filter(function (pin) {
        return pin.offer[key] === +filters[key];
      });
    }
  };

  /**
   * Фильрует метки по наличию дополнительных функций (wifi, dishwasher, conditioner, etc)
   * @param {String} key передаем ключ состояния фильтра
   * @param {Array} filters передаем массив с ключами состояния фильров
   * @return {Array} возвращаем отфильтрованный массив объектов по наличию дополнительных функций
   */
  var featuresFilter = function (key, filters) {
    if (filters[key] === 'none') {
      return filteredPins;
    } else {
      return filteredPins.filter(function (pin) {
        for (var i = 0; i < pin.offer.features.length; i++) {
          if (pin.offer.features[i] === filters[key]) {
            return true;
          }
        }
      });
    }
  };

  /**
   * Фильтрует метки
   * @param {DOMElement} target Объект, на который кликнули
   * @param {Object} filters Массив фильтров, примененных к меткам
   * @return {Array} Возвращаем массив отфильтрованных меток
   */
  var mapFilter = function (target, filters) {
    var filterKey;
    if (target.tagName === 'INPUT') {
      filterKey = target.id.replace('filter-', '');
      if (filters[filterKey] === 'none') {
        filters[filterKey] = filterKey;
      } else {
        filters[filterKey] = 'none';
      }
    } else {
      filterKey = target.id.replace('housing-', '');
      filters[filterKey] = target.value;
    }

    Object.keys(filters).forEach(function (key) {
      if (key === 'type') {
        filteredPins = typeFilter(key, filters);
      } else if (key === 'price') {
        filteredPins = priceFilter(key, filters);
      } else if (key === 'rooms' || key === 'guests') {
        filteredPins = roomsAndGuestsFilter(key, filters);
      } else {
        filteredPins = featuresFilter(key, filters);
      }
    });

    return filteredPins;
  };

  filtersForm.addEventListener('change', function (evt) {

    var target = evt.target;

    var mapContainerNode = window.mapPinsContainer.querySelectorAll('button');
    window.card.remove();
    mapContainerNode.forEach(function (it) {
      if (it.className !== 'map__pin map__pin--main') {
        window.mapPinsContainer.removeChild(it);
      }
    });

    if (target.tagName === 'SELECT' || target.tagName === 'INPUT') {
      window.mapPinsContainer.appendChild(window.pins.render(mapFilter(target, filterData)));
    }

  });
})();
