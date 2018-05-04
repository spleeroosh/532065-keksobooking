'use strict';
(function () {
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var TIME_OUT = 10000;

  var load = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200 && !data) {
        onLoad(xhr.response);
      } else if (xhr.status === 200 && data) {
        document.querySelector('.success').classList.remove('hidden');
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIME_OUT; // 10s
    return xhr;
  };

  window.backend = {
    download: function (onLoad, onError) {
      var xhr = load(onLoad, onError);
      xhr.open('GET', URL_GET);
      xhr.send();
    },

    upload: function (onLoad, onError, data) {
      var xhr = load(onLoad, onError, data);
      xhr.timeout = TIME_OUT; // 10s
      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };
})();
