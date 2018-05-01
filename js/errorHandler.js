'use strict';
(function () {
  /**
   * Обрабатываем ошибки, при работе с сетью, выводит сообщение с ошибкой на экран
   * @param {String} errorMessage
   */
  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.top = '40%';
    node.style.left = '40%';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
