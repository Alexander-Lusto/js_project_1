// 07 создаем DOM-элемент, который будет показывать сообщения об ошибках
'use strict';

(function () {
  var BODY = document.querySelector('body');

  window.showErrorMessage = function (message) {
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
      if (window.utils.isEscKeycode) {
        error.remove();
      }
    });

    error.appendChild(errorText);
    error.appendChild(errorClose);
    BODY.appendChild(error);
  };
})();
