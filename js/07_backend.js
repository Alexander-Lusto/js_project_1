// 07 Реализуем скачивание данных с сервера и отправку формы объявления на сервер
'use strict';

(function () {
  var BASE_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 30000;

  var onError = function (status, text) {
    switch (status) {
      case 400:
        window.showErrorMessage('Неверный запрос');
        break;

      case 401:
        window.showErrorMessage('Пользователь не авторизован');
        break;

      case 404:
        window.showErrorMessage('Страница не найдена');
        break;

      default:
        window.showErrorMessage('Статус ответа: ' + status + ' ' + text);
        break;
    }
  };

  var requestToServer = function (method, url, onLoad, data = '') {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      }
      else {
        onError(xhr.status, xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      window.showErrorMessage('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.showErrorMessage('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.send(data);
  };

  // send information on server;
  window.pageElements.form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var onLoad = function () {
      window.deactivatePage();
      window.showSuccessMessage();
      window.pageElements.mapElements.mainPin.addEventListener('mouseup', window.activatePage);
    };

    requestToServer('POST', BASE_URL, onLoad, new FormData(window.pageElements.form));
  });

  // get information from server;
  var onLoad = function (data) {
    window.serverData = data;
    window.utils.addListener(window.pageElements.mapElements.mainPin, 'mouseup', window.activatePage);
    return data;
  };

  requestToServer('GET', BASE_URL + '/data', onLoad);
})();
