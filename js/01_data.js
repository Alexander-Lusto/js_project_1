// 01 Create Data
'use strict';
(function(){
  var avatars =["01","02", "03", "04", "05", "06", "07", "08"];
  var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  var types =['flat', 'place', 'house', 'bungalo'];
  var checkin_times = ['12:00', '13:00', '14:00'];
  var checkout_times = ['12:00', '13:00', '14:00'];
  var features = [ "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
  var photos = [ "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg" ];
  window.announcements = [];

  var getFeaturesRendomLength = function () {
    var features_random_length= [];
    shuffleArray(features);
    for(var i = 0; i < getRandomInt(1, features.length); i++){
      features_random_length.push(features[i]);
    }
    return features_random_length;
  }

  shuffleArray(avatars);
  // shuffleArray(titles);

  for(let i = 0; i<8; i++){
    announcements[i] = {
      author:{
        avatar: 'img/avatars/user' +  avatars[i] + '.png'
      },
      offer:{
        title: titles[i],
        address: location.x +", " + location.y,
        price: getRandomInt(1000, 1000000),
        type: (i>=0 && i<=1) ? types[0]:
              (i>=2 && i<=3) ? types[1]:
              (i>=4 && i<=5) ? types[2]:
              (i>=6 && i<=7) ? types[3]: 'гусь',
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 3),
        checkin: checkin_times[getRandomInt(0, 2)],
        checkout: checkout_times[getRandomInt(0, 2)],
        features: getFeaturesRendomLength(),
        description: "",
        photos: shuffleArray(photos)
      },
      location:{
        x: Math.round(getRandomInt(0, 1000)/50)*50,
        y: Math.round(getRandomInt(0, 530)/50)*50
      }
    }
  }
  console.log(announcements);
})();
