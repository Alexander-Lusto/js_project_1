'use strict';
(function(){
  var BASE_URL = "https://js.dump.academy/keksobooking";
  var TIMEOUT = 30000;

  var requetToServer = function (method, url, onLoad, data = "") {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

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
      showError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.send(data);
  }

  //send information on server;
  form.addEventListener('submit', function(evt){
    evt.preventDefault();

    var onLoad = function (data) {
      form.reset();
    }

    requetToServer('POST', BASE_URL, onLoad, new FormData(form));
  });

  //get information from server;
  var onLoad = function (data) {
    window.server_data = data;
    addListener(map_elements.main_pin, 'mouseup', activatePage);
    return server_data;
  }

  requetToServer('GET', BASE_URL + '/data', onLoad);
})();
