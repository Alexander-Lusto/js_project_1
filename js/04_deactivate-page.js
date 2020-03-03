// Возвращаем страницу в неактивное состояние при отправке формы
'use strict';

(function () {
  var deactivateForm = function () {
    window.pageElements.form.classList.add('notice__form--disabled');
    for (var i = 0; i < window.pageElements.formElements.fieldsets.length; i++) {
      window.pageElements.formElements.fieldsets[i].disabled = true;
    }
  };

  window.deactivatePage = function () {
    window.pageElements.form.reset();
    var userPhotos = document.querySelectorAll('.form__photo');

    userPhotos.forEach(function (item) {
      item.remove();
    });

    var userAvatar = document.querySelector('img[alt="Аватар пользователя"]');
    userAvatar.src = 'img/muffin.png';
    window.pageElements.map.classList.add('map--faded');
    window.pageElements.mapElements.mainPin.style.top = '375px';
    window.pageElements.mapElements.mainPin.style.left = '50%';

    var mapPins = window.pageElements.map.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].remove();
    }

    var mapCard = window.pageElements.map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }

    deactivateForm();
  };
})();
