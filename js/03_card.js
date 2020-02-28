//03 Add cards to the map
// 'use strict';
(function(){
  var createElement = function(html_tag, class_name, text, parent_block){
    var element = document.createElement(html_tag);
    element.classList.add(class_name);
    element.textContent = text;
    if(parent_block){
      parent_block.appendChild(element);
      return element;
    } else{
      return element;
    }
  }

  window.createCard = function(object){
    //create template
    var template = document.querySelector('template').content.querySelector('.map__card');
    var template_item = template.cloneNode();

    //create avatar
    var avatar = createElement('img','popup__avatar');
    avatar.src = object.author['avatar'];
    avatar.width = 70;
    avatar.height = 70;
    template_item.appendChild(avatar);

    //create close button
    var close_button = createElement('button','popup__close','Закрыть', template_item);
    close_button.addEventListener('click', function(){
       template_item.remove();
    });

    var closePopup = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        template_item.remove();
        document.removeEventListener('keydown', closePopup);
      }
    }
    
    document.addEventListener('keydown', closePopup);

    // create title
    createElement('h3','popup__title', object.offer['title'], template_item);

    // create address
    createElement('p','popup__text--address', object.offer['address'], template_item);

    // create price
    createElement('p','popup__text--price', object.offer['price'] + ' \u{20BD}/ночь', template_item);

    //create popup__type
    var type = createElement('h4','popup__type');
    switch(object.offer['type']){
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
    createElement('p','popup__text--capacity',object.offer['rooms'] + ' комнаты для ' + object.offer['guests'] + ' гостей', template_item);

    //create checkin and checkout time
    createElement('p','popup__text--time','Заезд после ' + object.offer['checkin'] + ', выезд до ' + object.offer['checkout'], template_item);

    //create features
    var features = createElement('ul', 'popup__features', "", template_item);
    for(var i = 0; i < object.offer['features'].length; i++){
      var features_item = document.createElement('li');
      switch(object.offer['features'][i]){
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
    createElement('p','popup__description', object.offer['description'], template_item);

    //create photos
    var photos = createElement('ul','popup__photos', "", template_item);
    for(var i = 0; i < object.offer['photos'].length; i++){
      var photos_item = document.createElement('li');
      photos_item.style = 'display: inline;';
      photos.appendChild(photos_item);
      var photos_item_img = document.createElement('img');
      photos_item.appendChild(photos_item_img);
      photos_item_img.src = object.offer['photos'][i];
      photos_item_img.width = 65;
      photos_item_img.height = 65;
      photos_item_img.style = 'display: inline; margin-right: 5px;';
      photos_item.appendChild(photos_item_img);
    }
    map_elements.area.appendChild(template_item);
  }

  window.deletePreviousAnnouncements = function () {
    var map_cards = map.querySelectorAll('.map__card');
    for(var i = 0; i < map_cards.length; i++){
      map_cards[i].remove();
    }
  }
})();
