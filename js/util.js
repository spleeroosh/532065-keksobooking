'use strict';
(function () {
  var DEBOUNCE_TIME = 500;
  var lastTimeout;

  window.util = {

    /**
     * Функция для устранения дребезга, задает таймаут на выполнение
     * @param {Function} func Передаем, в качестве параметра, функцию, которую нужно отложить
     * @param {DOMElement} eventTarget Передаем ДОМ элемент, на который кликнули
     */
    debounce: function (fun, eventTarget) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun(eventTarget);
      }, DEBOUNCE_TIME);
    },

    /**
    * Передаем функию в метод sort, для сортировки массива
    * @return {number} возвращаем случайное число в диапазоне
    */
    sortArray: function () {
      return Math.random() - 0.5;
    },
    /**
     * Нахождение случайного свойства в массиве
     * @param {object} obj Передаем объект в функцию
     * @return {*} Возвращаем случайное свойство из объекта
     */
    getRandomProperty: function (obj) {
      var randomProperty;
      var count = 0;
      for (var key in obj) {
        if (Math.random() < 1 / ++count) {
          randomProperty = obj[key];
        }
      }
      return randomProperty;
    },
    /**
     * Нахождение случайного числа в диапазоне
     * @param {number} min минимальное число в диапазоне
     * @param {number} max максимальное число в диапазоне
     * @return {number} Возвращаем случайное число в диапазоне от min до max
     */
    randomInteger: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    /**
     * Нахождение случайного элемента в массиве
     * @param {Array} array передаем массив данных
     * @return {*} возвращаем случайный элемент массива
     */
    getRandomElement: function (array) {
      return array[window.util.randomInteger(window.MIN_ARRAY_LENGTH, array.length - 1)];
    },
    /**
     * Получаем и обрабатываем массив FEATURES
     * @param {Array} array
     * @return {Array} Возвращаем случайный массив из предложенных элементов массива FEATURES
     */
    getRandomFeatures: function (array) {
      var randomFeatures = [];
      for (var i = 0; i < window.util.randomInteger(1, array.length); i++) {
        randomFeatures[i] = array[i];
      }
      return randomFeatures;
    }
  };
})();
