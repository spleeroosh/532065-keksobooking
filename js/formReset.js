'use strict';
(function () {
  var START_COORDS = {
    x: '570',
    y: '375'
  }

  /**
   * Сбрасывает состояние страницы
   */
  window.formReset = function () {
    document.querySelector('.map').classList.add('map--faded');
    window.form.classList.add('ad-form--disabled');
    var fieldsetArray = window.form.querySelectorAll('fieldset');
    for (var n = 0; n < fieldsetArray.length; n++) {
      fieldsetArray[n].disabled = true;
    }
    window.card.remove(); // Скрываем карточку, при изменении фильтров
    window.pins.remove(); // Удаляем метки с карты

    window.form.querySelector('#type')[1].selected = true;
    window.form.querySelector('#price').value = '';
    window.form.querySelector('#price').min = 0;
    window.form.querySelector('#price').placeholder = 0;
    window.form.querySelector('#title').value = '';
    window.form.querySelector('#timein').value = '12:00';
    window.form.querySelector('#timeout').value = window.form.querySelector('#timein').value;
    window.form.querySelector('#description').value = '';

    var roomCapacity = window.form.querySelector('#capacity');
    document.querySelector('#room_number').selectedIndex = null;

    for (var i = 0; i < roomCapacity.length; i++) {
      if (roomCapacity[i].value === '1') {
        roomCapacity[i].disabled = false;
        roomCapacity[i].selected = true;
      } else {
        roomCapacity[i].disabled = true;
      }
    }

    document.querySelector('.map__pin--main').style.left = START_COORDS.x + 'px';
    document.querySelector('.map__pin--main').style.top = START_COORDS.y + 'px';
    window.showAddress();

    var featuresChecked = window.form.querySelectorAll('.feature__checkbox');
    [].map.call(featuresChecked, function (obj) {
      obj.checked = false;
    });
  };
})();
