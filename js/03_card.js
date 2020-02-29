// 03 Создаем карточку объявления при клике на метку
'use strict';

(function () {
  var createElement = function (htmlTag, className, text, parentBlock) {
    var element = document.createElement(htmlTag);
    element.classList.add(className);
    element.textContent = text;
    if (parentBlock) {
      parentBlock.appendChild(element);
      return element;
    }
    else {
      return element;
    }
  };

  window.createCard = function (object) {
    // create template
    var template = document.querySelector('template').content.querySelector('.map__card');
    var templateItem = template.cloneNode();

    // create avatar
    var avatar = createElement('img', 'popup__avatar');
    avatar.src = object.author['avatar'];
    avatar.width = 70;
    avatar.height = 70;
    templateItem.appendChild(avatar);

    // create close button
    var closeButton = createElement('button', 'popup__close', 'Закрыть', templateItem);
    closeButton.addEventListener('click', function () {
      templateItem.remove();
    });

    var closePopup = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        evt.preventDefault();
        templateItem.remove();
        document.removeEventListener('keydown', closePopup);
      }
    };
    document.addEventListener('keydown', closePopup);

    // create title
    createElement('h3', 'popup__title', object.offer['title'], templateItem);

    // create address
    createElement('p', 'popup__text--address', object.offer['address'], templateItem);

    // create price
    createElement('p', 'popup__text--price', object.offer['price'] + ' \u{20BD}/ночь', templateItem);

    // create type
    var type = createElement('h4', 'popup__type');
    switch (object.offer['type']) {
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
    templateItem.appendChild(type);

    // create rooms and guests
    createElement('p', 'popup__text--capacity', object.offer['rooms'] + ' комнаты для ' + object.offer['guests'] + ' гостей', templateItem);

    // create checkin and checkout time
    createElement('p', 'popup__text--time', 'Заезд после ' + object.offer['checkin'] + ', выезд до ' + object.offer['checkout'], templateItem);

    // create features
    var features = createElement('ul', 'popup__features', '', templateItem);
    for (var i = 0; i < object.offer['features'].length; i++) {
      var featuresItem = document.createElement('li');
      switch (object.offer['features'][i]) {
        case 'wifi':
          featuresItem.classList.add('feature', 'feature--wifi');
          break;

        case 'dishwasher':
          featuresItem.classList.add('feature', 'feature--dishwasher');
          break;

        case 'parking':
          featuresItem.classList.add('feature', 'feature--parking');
          break;

        case 'washer':
          featuresItem.classList.add('feature', 'feature--washer');
          break;

        case 'elevator':
          featuresItem.classList.add('feature', 'feature--elevator');
          break;

        case 'conditioner':
          featuresItem.classList.add('feature', 'feature--conditioner');
          break;
      }
      features.appendChild(featuresItem);
    }

    // create description
    createElement('p', 'popup__description', object.offer['description'], templateItem);

    // create photos
    var photos = createElement('ul', 'popup__photos', '', templateItem);
    for (i = 0; i < object.offer['photos'].length; i++) {
      var photosItem = document.createElement('li');
      photosItem.style = 'display: inline;';
      photos.appendChild(photosItem);
      var photosItemImg = document.createElement('img');
      photosItem.appendChild(photosItemImg);
      photosItemImg.src = object.offer['photos'][i];
      photosItemImg.width = 65;
      photosItemImg.height = 65;
      photosItemImg.style = 'display: inline; margin-right: 5px;';
      photosItem.appendChild(photosItemImg);
    }
    window.mapElements.area.appendChild(templateItem);
  };

  window.deletePreviousAnnouncements = function () {
    var mapCards = window.map.querySelectorAll('.map__card');
    for (var i = 0; i < mapCards.length; i++) {
      mapCards[i].remove();
    }
  };
})();
