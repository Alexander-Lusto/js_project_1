// 01 Создаем моковые данные для работы при отсутствии данных с сервера
'use strict';

(function () {
  window.announcements = [];
  var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'place', 'house', 'bungalo'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  var getFeaturesRendomLength = function () {
    var featuresArrayRandomLength = [];
    window.shuffleArray(features);
    for (var i = 0; i < window.getRandomInt(1, features.length); i++) {
      featuresArrayRandomLength.push(features[i]);
    }
    return featuresArrayRandomLength;
  };

  var getType = function (i) {

    if (i >= 0 && i <= 1) {
      return types[0];
    }
    else if (i >= 2 && i <= 3) {
      return types[1];
    }
    else if (i >= 4 && i <= 5) {
      return types[2];
    }
    else if (i >= 6 && i <= 7) {
      return types[3];
    }
    else {
      return '';
    }

  };

  window.shuffleArray(avatars);

  for (let i = 0; i < 8; i++) {
    window.announcements[i] = {
      author: {
        avatar: 'img/avatars/user' + avatars[i] + '.png'
      },
      location: {
        x: Math.round(window.getRandomInt(0, 1000) / 50) * 50,
        y: Math.round(window.getRandomInt(0, 530) / 50) * 50
      },
      offer: {
        title: titles[i],
        address: 'x' + ' y',
        price: window.getRandomInt(1000, 1000000),
        type: getType(i),
        rooms: window.getRandomInt(1, 5),
        guests: window.getRandomInt(1, 3),
        checkin: checkinTimes[window.getRandomInt(0, 2)],
        checkout: checkoutTimes[window.getRandomInt(0, 2)],
        features: getFeaturesRendomLength(),
        description: '',
        photos: window.shuffleArray(photos)
      }
    };
  }
})();
