// 02 Создаем метки на карте
'use strict';

(function () {
  window.addPinsOnMap = function (array) {
    var template = document.querySelector('template').content.querySelector('.map__pin');
    for (var i = 0; i < array.length; i++) {
      var templateItem = template.cloneNode(true);
      var templateItemImg = templateItem.querySelector('img');

      templateItem.style = 'left: ' + array[i].location['x'] + 'px; ' + 'bottom: ' + (array[i].location['y'] - 250) + 'px;';
      templateItemImg.src = array[i].author['avatar'];
      templateItemImg.title = array[i].offer['title'];

      (function (pin) {
        templateItem.addEventListener('click', function () {
          window.deletePreviousAnnouncements();
          window.createCard(pin);
        });
      })(array[i]);

      window.pageElements.mapElements.area.appendChild(templateItem);
    }
  };
})();
