// 07 создаем DOM-элемент, который будет показывать сообщение об успешной отправке формы
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var BODY = document.querySelector('body');

  window.showSuccessMessage = function () {
    var message = document.createElement('div');
    var messageText = document.createElement('p');
    var messageClose = document.createElement('span');

    messageClose.textContent = '\u00D7';
    messageText.textContent = 'Ваше объявление успешно отправлено!';

    message.classList.add('message');
    messageClose.classList.add('btn-close');

    messageClose.addEventListener('click', function () {
      message.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        message.remove();
      }
    });

    message.appendChild(messageText);
    message.appendChild(messageClose);
    BODY.appendChild(message);
  };
})();
