// 07 Реализуем скачивание данных с сервера и отправку формы объявления на сервер
'use strict';

(function () {
  var BASE_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 30000;

  var requestToServer = function (method, url, onLoad, data = '') {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      }
      else {
        window.onError(xhr.status, xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      window.showError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.showError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.send(data);
  };

  // send information on server;
  window.form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var onLoad = function () {
      window.deactivatePage();
      window.showSuccessMessage();
      window.mapElements.mainPin.addEventListener('mouseup', window.activatePage);
    };

    requestToServer('POST', BASE_URL, onLoad, new FormData(window.form));
  });

  // get information from server;
  var onLoad = function (data) {
    window.serverData = data;
    window.addListener(window.mapElements.mainPin, 'mouseup', window.activatePage);
    return data;
  };

  requestToServer('GET', BASE_URL + '/data', onLoad);
})();
