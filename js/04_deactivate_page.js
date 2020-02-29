// Возвращаем страницу в неактивное состояние при отправке формы
'use strict';

(function () {
  var deactivateForm = function () {
    window.form.classList.add('notice__form--disabled');
    for (var i = 0; i < window.formElements.fieldsets.length; i++) {
      window.formElements.fieldsets[i].disabled = true;
    }
  };

  window.deactivatePage = function () {
    window.form.reset();
    var userPhotos = document.querySelectorAll('.form__photo');

    userPhotos.forEach(function (item) {
      item.remove();
    });

    var userAvatar = document.querySelector('img[alt="Аватар пользователя"]');
    userAvatar.src = 'img/muffin.png';
    window.map.classList.add('map--faded');
    window.mapElements.mainPin.style.top = '375px';
    window.mapElements.mainPin.style.left = '50%';

    var mapPins = window.map.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].remove();
    }

    var mapCard = window.map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }

    deactivateForm();
  };
})();
