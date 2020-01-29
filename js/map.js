// 03 DOM

//letiables
const avatars =["01","02", "03", "04", "05", "06", "07", "08"];
const titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

const types =['place', 'flat', 'house', 'bungalo'];
const checkin_times = ['12:00', '13:00', '14:00'];
const checkout_times = ['12:00', '13:00', '14:00'];
const features = [ "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
//const photos_array = [ "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg" ];

// generate random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// generate announcments for map
let generateObject = function(){
  let announcements = [];
  for(let i = 0; i<8; i++){
    announcements[i] = {};
    let index;
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
    let location_x = Math.round(getRandomInt(0, 1000)/50)*50;
    let location_y = Math.round(getRandomInt(0, 530)/50)*50;
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
    for(let j = 0; j < index ; j++){
      announcements[i].offer['features'][j] = features[j];
    }
    //"description": пустая строка,
    announcements[i].offer['description'] = "";

    //"photos": массив из строк расположенных в произвольном порядке
    announcements[i].offer['photos'] = [];
    const photos = [ "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg" ];
    let photos_length = photos.length;
    for(let j = 0; j < photos_length ; j++){
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

let announcements = generateObject();

// add pins to the map
let addElements = function(elements){
  const template = document.querySelector('template').content.querySelector('.map__pin') ;
  for(let i = 0; i < elements.length; i++){
    const template_item = template.cloneNode(true);
    let template_item_img = template_item.querySelector('img');
    template_item.style = 'left: ' + elements[i].location['x'] + 'px; ' + 'bottom: '  + elements[i].location['y'] + 'px;';
    template_item_img.src = elements[i].author['avatar'];
    template_item_img.title = elements[i].offer['title'];
    template_item.addEventListener('click', function(){
      console.log('click');
      addAnouncement(announcements[i]);
    });
    map_area.appendChild(template_item);
  }
}

let createElement = function(html_tag, class_name, text, parent_block){
  let element = document.createElement(html_tag);
  element.classList.add(class_name);
  element.textContent = text;
  if(parent_block){
    parent_block.appendChild(element);
    return element;
  } else{
    return element;
  }
}

// add announcment to the page
let addAnouncement = function(element){
  //create template
  const template = document.querySelector('template').content.querySelector('.map__card');
  const template_item = template.cloneNode();

  //create avatar
  let avatar = createElement('img','popup__avatar');
  avatar.src = element.author['avatar'];
  avatar.width = 70;
  avatar.height = 70;
  template_item.appendChild(avatar);

  //create button
  var popup_close = createElement('button','popup__close','Закрыть', template_item);
  popup_close.addEventListener('click', function(){
      template_item.remove();
  });

  // create title
  createElement('h3','popup__title', element.offer['title'], template_item);

  // create address
  createElement('p','popup__text--address', element.offer['address'], template_item);

  // create price
  createElement('p','popup__text--price', element.offer['price'] + ' \u{20BD}/ночь', template_item);

  //create popup__type
  let type = createElement('h4','popup__type');
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
  createElement('p','popup__text--capacity',element.offer['rooms'] + ' комнаты для ' + element.offer['guests'] + ' гостей', template_item);

  //create checkin and checkout time
  createElement('p','popup__text--time','Заезд после ' + element.offer['checkin'] + ', выезд до ' + element.offer['checkout'], template_item);

  //create features
  let features = createElement('ul', 'popup__features', "", template_item);
  for(let i = 0; i < element.offer['features'].length; i++){
    let features_item = document.createElement('li');
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
  createElement('p','popup__description', element.offer['description'], template_item);

  //create photos
  let photos = createElement('ul','popup__photos', "", template_item);
  for(let i = 0; i < element.offer['photos'].length; i++){
    let photos_item = document.createElement('li');
    photos_item.style = 'display: inline;';
    photos.appendChild(photos_item);
    let photos_item_img = document.createElement('img');
    photos_item.appendChild(photos_item_img);
    photos_item_img.src = element.offer['photos'][i];
    photos_item_img.width = 65;
    photos_item_img.height = 65;
    photos_item_img.style = 'display: inline; margin-right: 5px;';
    photos_item.appendChild(photos_item_img);
  }
  map_area.appendChild(template_item);
  console.log(template_item);
}
