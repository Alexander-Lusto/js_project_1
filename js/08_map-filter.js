// 08 Создаем возможность фильтрации меток
'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var filter = {
    all: mapFilter.querySelectorAll('.map__filter'),
    type: mapFilter.querySelector('#housing-type'),
    price: mapFilter.querySelector('#housing-price'),
    rooms: mapFilter.querySelector('#housing-rooms'),
    guests: mapFilter.querySelector('#housing-guests'),
    features: {
      all: mapFilter.querySelectorAll('input[name="features"]'),
      wifi: mapFilter.querySelector('#filter-wifi'),
      dishwasher: mapFilter.querySelector('#filter-dishwasher'),
      parking: mapFilter.querySelector('#filter-parking'),
      washer: mapFilter.querySelector('#filter-washer'),
      elevator: mapFilter.querySelector('#filter-elevator'),
      conditioner: mapFilter.querySelector('#filter-conditioner')
    }
  };

  var filterPins = function () {

    var filterArray = function (filterType, array) {
      var filteredArray = array.filter(function (item) {

        if (filterType === 'rooms' || filterType === 'gusts') {
          return item.offer[filterType] === Number(filter[filterType].value) || filter[filterType].value === 'any';
        }

        if (filterType === 'price') {

          if (filter['price'].value === 'any') {
            return item;
          }
          else if (filter['price'].value === 'low') {
            return item.offer['price'] < 10000;
          }
          else if (filter['price'].value === 'middle') {
            return item.offer['price'] > 10000 && item.offer['price'] < 50000;
          }
          else if (filter['price'].value === 'high') {
            return item.offer['price'] > 50000;
          }

        }

        return item.offer[filterType] === filter[filterType].value || filter[filterType].value === 'any';
      });
      return filteredArray;
    };

    var filteredByType = filterArray('type', window.serverData);
    var filteredByPrice = filterArray('price', filteredByType);
    var filteredByRooms = filterArray('rooms', filteredByPrice);
    var filteredByGuests = filterArray('guests', filteredByRooms);

    var filterByFeatures = function (feature, array) { // фильтруем по преимуществам (выбранное преимущество, отфильтрованный массив)

      if (filter.features[feature].checked === true) { // если фильтр N выбран, тогда:

        var filteredBySmth = array.filter(function (item) { // фильтруем полученный массив

          for (var i = 0; i < item.offer.features.length; i++) { // с помощью цикла проходимся по каждому элементу

            if (item.offer.features[i] === feature) { // и если элемент содержит данное преимущество, отправляем его в новый массив filteredBySmth
              return item;
            }

          }
          return '';
        });

        return filteredBySmth;
      }
      else {
        return array;
      }
    };

    var filteredByWifi = filterByFeatures('wifi', filteredByGuests);
    var filteredByDishwasher = filterByFeatures('dishwasher', filteredByWifi);
    var filteredByParking = filterByFeatures('parking', filteredByDishwasher);
    var filteredByWasher = filterByFeatures('washer', filteredByParking);
    var filteredByElevator = filterByFeatures('elevator', filteredByWasher);
    var filteredByConditioner = filterByFeatures('conditioner', filteredByElevator);

    var pins = window.pageElements.map.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }

    window.addPinsOnMap(filteredByConditioner);
  };

  filter['all'].forEach(function (item) {
    item.addEventListener('change', function () {
      window.debounce(filterPins);
    });
  });

  filter['features']['all'].forEach(function (item) {
    item.addEventListener('change', function () {
      window.debounce(filterPins);
    });
  });
})();
