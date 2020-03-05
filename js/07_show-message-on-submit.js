// 07 создаем DOM-элемент, который будет показывать сообщение об успешной отправке формы
'use strict';

(function () {
  var BODY = document.querySelector('body');

  window.showMessageOnSubmit = function (text) {
    var message = document.createElement('div');
    var messageText = document.createElement('p');
    var messageClose = document.createElement('span');

    messageClose.textContent = '\u00D7';

    if (text) {
      messageText.textContent = text;
      message.classList.add('error');
    } 
    else {
      messageText.textContent = 'Ваше объявление успешно отправлено!';
      message.classList.add('message');
    }
    
    messageClose.classList.add('btn-close');

    messageClose.addEventListener('click', function () {
      message.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (window.utils.isEscKeycode) {
        message.remove();
      }
    });

    message.appendChild(messageText);
    message.appendChild(messageClose);
    BODY.appendChild(message);
  };
})();
