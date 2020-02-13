'use strict';
(function(){
  var URL = "https://js.dump.academy/keksobooking/data";

  var onLoad = function (data) {
    return window.server_data = data;
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

  window.upload = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

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
    xhr.send();
  }
  upload(onLoad, onError);
})();
