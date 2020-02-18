//07 создаем DOM-элемент, который будет показывать сообщения об ошибках
'use strict';
(function(){
  var ESC_KEYCODE = 27;
  var BODY = document.querySelector('body');

  window.onError = function (status, text) {
    switch (status) {
      case 400:
        showError('Неверный запрос');
        break;

      case 401:
        showError("Пользователь не авторизован");
        break;

      case 404:
        showError("Страница не найдена");
        break;

      default:
        showError("Статус ответа: " + status + ' ' + text);
        break;
    }
  }

  window.showError = function (message) {
    var error = document.createElement('div');
    var error_text = document.createElement('p');
    var error_close = document.createElement('span');

    error_close.textContent = '\u00D7';
    error_text.textContent = message;

    error.classList.add('error');
    error_close.classList.add('btn-close');

    error_close.addEventListener('click', function(){
      error.remove();
    });

    document.addEventListener('keydown', function(evt){
      if(evt.keyCode === ESC_KEYCODE){
        error.remove();
      }
    });

    error.appendChild(error_text);
    error.appendChild(error_close);
    BODY.appendChild(error);
  };
})();