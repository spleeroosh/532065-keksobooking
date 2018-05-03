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

  var HOUSE_PRICES = {
    low: '10000',
    middle: '50000'
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
        var keyInPin;
        if (filters[key] === 'middle') {
          keyInPin = pin.offer[key] > HOUSE_PRICES.low && pin.offer[key] < HOUSE_PRICES.middle;
        } else if (filters[key] === 'low') {
          keyInPin = pin.offer[key] < HOUSE_PRICES.low;
        } else if (filters[key] === 'high') {
          keyInPin = pin.offer[key] > HOUSE_PRICES.middle;
        }
        return keyInPin;
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
        var keyInPin;
        for (var i = 0; i < pin.offer.features.length; i++) {
          if (pin.offer.features[i] === filters[key]) {
            keyInPin = true;
          }
        }
        return keyInPin;
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

  /**
   * Функция рендера меток после применения фильтров
   * @param {Array} pins массив отфильтрованных меток
   */
  var applyFilterToPins = function (pins) {
    window.card.remove(); // Скрываем карточку, при изменении фильтров
    window.pins.remove(); // Удаляем метки с карты
    window.mapPinsContainer.appendChild(window.pins.render(pins, window.PINS_QUANTITY));
  };

  filtersForm.addEventListener('change', function (evt) {
    var target = evt.target;
    mapFilter(target, filterData);
    if (target.tagName === 'SELECT' || target.tagName === 'INPUT') {
      window.util.debounce(applyFilterToPins, filteredPins);
    }
  });

})();
