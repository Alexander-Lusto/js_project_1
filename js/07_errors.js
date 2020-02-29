// 07 создаем DOM-элемент, который будет показывать сообщения об ошибках
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var BODY = document.querySelector('body');

  window.onError = function (status, text) {
    switch (status) {
      case 400:
        window.showError('Неверный запрос');
        break;

      case 401:
        window.showError('Пользователь не авторизован');
        break;

      case 404:
        window.showError('Страница не найдена');
        break;

      default:
        window.showError('Статус ответа: ' + status + ' ' + text);
        break;
    }
  };

  window.showError = function (message) {
    var error = document.createElement('div');
    var errorText = document.createElement('p');
    var errorClose = document.createElement('span');

    errorClose.textContent = '\u00D7';
    errorText.textContent = message;

    error.classList.add('error');
    errorClose.classList.add('btn-close');

    errorClose.addEventListener('click', function () {
      error.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        error.remove();
      }
    });

    error.appendChild(errorText);
    error.appendChild(errorClose);
    BODY.appendChild(error);
  };
})();
