'use strict';
(function () {
  window.data = {
    /**
     * Добавляет в ДОМ список li с классами, соответствующими массиву
     * @param {Array} array передаем массив features
     * @return {*} возвращаем featuresFragment
     */
    getNewFeatures: function (array) {
      var featuresFragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + array[i];
        featuresFragment.appendChild(li);
      }
      return featuresFragment;
    },
    /**
     * Добавляет в ДОМ img с src, соответствующими массиву
     * @param {Array} array передаем массив photos
     * @return {*} возвращаем photosFragment
     */
    getNewPhotos: function (array) {
      var photosFragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        var img = document.createElement('img');
        img.className = 'popup__photo';
        img.src = array[i];
        img.width = '45';
        img.height = '40';
        img.alt = 'Фотография жилья';
        photosFragment.appendChild(img);
      }
      return photosFragment;
    }
  };
})();
