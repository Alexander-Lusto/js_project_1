// 03 DOM

//variables
var avatars =["01","02", "03", "04", "05", "06", "07", "08"];
var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

var types =['place', 'flat', 'house', 'bungalo'];
var checkin_times = ['12:00', '13:00', '14:00'];
var checkout_times = ['12:00', '13:00', '14:00'];
var features = [ "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
//var photos = [ "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg" ];

// generate random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// generate announcments for map
var generateObject = function(){
  var announcements = [];
  for(var i = 0; i<8; i++){
    announcements[i] = {};
    var index;
    announcements[i].author = {};

    // "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём
    index = getRandomInt(0, avatars.length);
    announcements[i].author['avatar'] = 'img/avatars/user' + avatars[index] +'.png';
    avatars.splice(index, 1);

    // "title": строка, заголовок предложения, одно из фиксированных значений. Значения не должны повторяться.
    announcements[i].offer = {};
    index = getRandomInt(0, titles.length);
    announcements[i].offer['title'] = titles[index];
    titles.splice(index, 1);

    //"address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    announcements[i].offer['address'] = {};
    announcements[i].offer['address']['location'] = {};
    var location_x = Math.round(getRandomInt(0, 1000)/50)*50;
    var location_y = Math.round(getRandomInt(0, 530)/50)*50;
    announcements[i].offer['address']= location_x + ", " + location_y;

    //"price": число, случайная цена от 1000 до 100 000
    announcements[i].offer['price'] = Math.round(getRandomInt(1000, 100000)/1000)*1000;

    //"type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    index = getRandomInt(0, types.length);
    announcements[i].offer['type'] = types[index];

    //"rooms": число, случайное количество комнат от 1 до 5
    announcements[i].offer['rooms'] = getRandomInt(1, 5);

    //"guests": число, случайное количество гостей, которое можно разместить
    announcements[i].offer['guests'] = getRandomInt(1, 10);

    //"checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    announcements[i].offer['checkin'] = getRandomInt(12, 14) + ":00";
    //"checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    announcements[i].offer['checkout'] = getRandomInt(12, 14) + ":00";

    //"features": массив строк случайной длины из предложенных (может ли быть 0 преимуществ?)
    announcements[i].offer['features'] = [];
    index = getRandomInt(1, features.length);
    for(var j = 0; j < index ; j++){
      announcements[i].offer['features'][j] = features[j];
    }
    //"description": пустая строка,
    announcements[i].offer['description'] = "";

    //"photos": массив из строк расположенных в произвольном порядке
    announcements[i].offer['photos'] = [];
    var photos = [ "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg" ];
    var photos_length = photos.length;
    for(var j = 0; j < photos_length ; j++){
      index = getRandomInt(0, photos.length);
      announcements[i].offer['photos'][j] = photos[index];
      photos.splice(index, 1);
    }
    //"location": «x»: случайное число, координата x метки на карте. «y»: случайное число, координата y метки на карте от 130 до 630.
    //Значение ограничено размерами блока, в котором перетаскивается метка.
    announcements[i].location = {};
    announcements[i].location['x'] = location_x;
    announcements[i].location['y'] = location_y;
  }
  console.log(announcements);
  return announcements;
}
var announcements = generateObject();

//show map
var map = document.querySelector('.map');
map.classList.remove("map--faded");
map = map.querySelector('.map__pins');

// add pins to the map
var addElements = function(elements){
  var template = document.querySelector('template').content.querySelector('.map__pin') ;
  for(var i = 0; i < elements.length; i++){
    var template_item = template.cloneNode(true);
    var template_item_img = template_item.querySelector('img');
    template_item.style = 'left: ' + elements[i].location['x'] + 'px; ' + 'bottom: '  + elements[i].location['y'] + 'px;';
    template_item_img.src = elements[i].author['avatar'];
    template_item_img.title = elements[i].offer['title'];
    map.appendChild(template_item);
  }
}
addElements(announcements);

// add announcment to the page
var addAnouncement = function(element){
  //create template
  var template = document.querySelector('template').content.querySelector('.map__card');
  var template_item = template.cloneNode();

  //create avatar
  var avatar = document.createElement('img');
  avatar.classList.add('popup__avatar');
  avatar.src = element.author['avatar'];
  avatar.width = 70;
  avatar.height = 70;
  template_item.appendChild(avatar);

  //create button
  var close_button = document.createElement('button');
  close_button.classList.add('popup__close');
  close_button.textContent = 'Закрыть';
  template_item.appendChild(close_button);

  // create title
  var title = document.createElement('h3');
  title.classList.add('popup__title');
  title.textContent = element.offer['title'];
  template_item.appendChild(title);

  // create address
  var address = document.createElement('p');
  address.classList.add('popup__text--address');
  address.textContent = element.offer['address'];
  template_item.appendChild(address );
  // create price
  var price = document.createElement('p');
  price.classList.add('popup__text--price');
  price.textContent = element.offer['price'] + ' \u{20BD}/ночь';
  template_item.appendChild(price);

  //create popup__type
  var type = document.createElement('h4');
  type.classList.add('popup__type');
  switch(element.offer['type']){
    case 'flat':
    type.textContent = 'Квартира';
    break;

    case 'bungalo':
    type.textContent = 'Бунгало';
    break;

    case 'house':
    type.textContent = 'Дом';
    break;

    case 'place':
    type.textContent = 'Дворец';
    break;
  }
  template_item.appendChild(type);

  //create rooms and guests
  var guests = document.createElement('p');
  guests.classList.add('popup__text--capacity');
  guests.textContent = element.offer['rooms'] + ' комнаты для ' + element.offer['guests'] + ' гостей';
  template_item.appendChild(guests);

  //create checkin and checkout time
  var time = document.createElement('p');
  time.classList.add('popup__text--time');
  time.textContent = 'Заезд после ' + element.offer['checkin'] + ', выезд до ' + element.offer['checkout'];
  template_item.appendChild(time);

  //create features
  var features = document.createElement('ul');
  features.classList.add('popup__features');
  template_item.appendChild(features);
  for(var i = 0; i < element.offer['features'].length; i++){
    var features_item = document.createElement('li');
    switch(element.offer['features'][i]){
      case 'wifi':
      features_item.classList.add('feature','feature--wifi');
      break;

      case 'dishwasher':
      features_item.classList.add('feature','feature--dishwasher');
      break;

      case 'parking':
      features_item.classList.add('feature','feature--parking');
      break;

      case 'washer':
      features_item.classList.add('feature','feature--washer');
      break;

      case 'elevator':
      features_item.classList.add('feature','feature--elevator');
      break;

      case 'conditioner':
      features_item.classList.add('feature','feature--conditioner');
      break;
    }
    features.appendChild(features_item);
  }

  //create description
  var description = document.createElement('p');
  description.classList.add('popup__description');
  description.textContent = element.offer['description'];
  template_item.appendChild(description);


  //create photos
  var photos= document.createElement('ul');
  photos.classList.add('popup__photos');
  template_item.appendChild(photos);
  for(var i = 0; i < element.offer['photos'].length; i++){
    var photos_item = document.createElement('li');
    photos_item.style = 'display: inline;';
    photos.appendChild(photos_item);
    var photos_item_img = document.createElement('img');
    photos_item.appendChild(photos_item_img);
    photos_item_img.src = element.offer['photos'][i];
    photos_item_img.width = 65;
    photos_item_img.height = 65;
    photos_item_img.style = 'display: inline; margin-right: 5px;';
    features.appendChild(features_item);
  }
  map.appendChild(template_item);
  console.log(template_item);
}
addAnouncement(announcements[0]);
