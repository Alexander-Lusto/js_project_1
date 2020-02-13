'use strict';
(function(){
  var URL = 'https://js.dump.academy/keksobooking';

  var onLoad = function (data) {
    console.log(data)
    form.reset();
  }

  var onError = function (status, text) {
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

  window.send = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL);
    console.log(xhr.statusText);

    xhr.addEventListener('load', function(){
      if(xhr.status === 200){
        onLoad(xhr.response);
      } else{
        onError(xhr.status, xhr.statusText);
      }
    });

    xhr.addEventListener('error', function(){
      showError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function(){
      showError('Запрос не успел выполнится за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 30000;
    xhr.send(data);
  }

  form.addEventListener('submit', function(evt){
    evt.preventDefault();
    send(new FormData(form), onLoad, onError);
  });
})();
