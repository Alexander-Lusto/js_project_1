'use strict';
(function(){
  var map_filter = document.querySelector('.map__filters');
  var filter = {
    all: map_filter.querySelector('.map__filters'),
    type: map_filter.querySelector('#housing-type'),
    price: map_filter.querySelector('#housing-price'),
    rooms: map_filter.querySelector('#housing-rooms'),
    guests: map_filter.querySelector('#housing-guests'),
    features: {
      all: map_filter.querySelector('#housing-features'),
      wifi: map_filter.querySelector('#filter-wifi'),
      dishwasher: map_filter.querySelector('#filter-dishwasher'),
      parcking: map_filter.querySelector('#filter-parking'),
      washer: map_filter.querySelector('#filter-washer'),
      elevator: map_filter.querySelector('#filter-elevator'),
      conditioner: map_filter.querySelector('#filter-conditioner'),
    }
  }
  var filtered_by_type = [];
  var filtered_by_price = [];
  var filtered_by_rooms = [];
  var filtered_by_guests = [];
  var filtered_by_all = [];


  //пока можно работать только с одним фильтром, не знаю как сделать чтобы функции видели друг друга
  var filterPinsByType = function (filter, value) {
    var filtered_array = server_data.filter(function (item) {
      if (value === 'any') {
        return server_data;
      }
      return item.offer[filter] === value;
    });
    filtered_by_type = [];
    filtered_by_type = filtered_array;
    var pins = map.querySelectorAll('.map__pin');
    filtered_by_all = filtered_by_type.concat(filtered_by_price, filtered_by_rooms, filtered_by_guests);

    filtered_by_all = filtered_by_all.filter(function(item, i){
      return filtered_by_all.indexOf(item) === i;
    });

    pins.forEach(function (item){
      item.remove();
    });

    addPinsOnMap(filtered_by_all);
  }

  var filterPinsByRooms = function (filter, value) {
    var filtered_array = server_data.filter(function (item) {
      if (value === 'any') {
        return server_data;
      }
      return item.offer[filter] === value;
    });
    filtered_by_rooms = [];
    filtered_by_rooms = filtered_array;
    var pins = map.querySelectorAll('.map__pin');
    filtered_by_all = filtered_by_type.concat(filtered_by_price, filtered_by_rooms, filtered_by_guests);

    filtered_by_all = filtered_by_all.filter(function(item, i){
      return filtered_by_all.indexOf(item) === i;
    });

    pins.forEach(function (item){
      item.remove();
    });

    addPinsOnMap(filtered_by_all);
  }

  var filterPinsByGuests = function (filter, value) {
    var filtered_array = server_data.filter(function (item) {
      if (value === 'any') {
        return server_data;
      }
      return item.offer[filter] === value;
    });
    filtered_by_guests = [];
    filtered_by_guests = filtered_array;
    var pins = map.querySelectorAll('.map__pin');
    filtered_by_all = filtered_by_type.concat(filtered_by_price, filtered_by_rooms, filtered_by_guests);

    filtered_by_all = filtered_by_all.filter(function(item, i){
      return filtered_by_all.indexOf(item) === i;
    });

    pins.forEach(function (item){
      item.remove();
    });

    addPinsOnMap(filtered_by_all);
  }

  var filterPinsByFeatures = function (filter, value) {
    var filtered_array = server_data.filter(function (item) {
      for(var i = 0; i < item.offer[filter].length; i++){
        if (item.offer[filter][i] === value){
          return item;
        }
      }
    });
    filtered_by_features = [];
    filtered_by_features = filtered_array;
    var pins = map.querySelectorAll('.map__pin');
    filtered_by_all = filtered_by_type.concat(filtered_by_price, filtered_by_rooms, filtered_by_guests);

    filtered_by_all = filtered_by_all.filter(function(item, i){
      return filtered_by_all.indexOf(item) === i;
    });

    pins.forEach(function (item){
      item.remove();
    });

    addPinsOnMap(filtered_by_all);
  }

  var filterPinsByPrice = function (value) {
    var filtered_array = server_data.filter(function (item) {
      if (value === 'any') {
        return server_data;
      }
      else if (value === 'low') {
        return item.offer['price'] < 10000;
      }
      else if (value === 'middle') {
        return item.offer['price'] > 10000 && item.offer['price'] < 50000;
      }
      else if (value === 'high') {
        return item.offer['price'] > 50000;
      }
    });
    filtered_by_price = [];
    filtered_by_price = filtered_array;
    var pins = map.querySelectorAll('.map__pin');
    filtered_by_all = filtered_by_type.concat(filtered_by_price, filtered_by_rooms, filtered_by_guests);

    filtered_by_all = filtered_by_all.filter(function(item, i){
      return filtered_by_all.indexOf(item) === i;
    });

    pins.forEach(function (item){
      item.remove();
    });

    addPinsOnMap(filtered_by_all);
  }

  filter['type'].addEventListener('change', function () {
    switch(filter['type'].value){
      case 'any' :
        filterPinsByType('type', 'any');
        break;

      case 'flat':
        filterPinsByType('type', 'flat');
        break;

      case 'house':
        filterPinsByType('type', 'house');
        break;

      case 'bungalo':
        filterPinsByType('type', 'bungalo');
        break;
    }
  });

  filter['price'].addEventListener('change', function () {
    switch(filter['price'].value){
      case 'any' :
        filterPinsByPrice('any');
        break;

      case 'middle':
        filterPinsByPrice('middle');
        break;

      case 'low':
        filterPinsByPrice('low');
        break;

      case 'high':
        filterPinsByPrice('high');
        break;
    }
  });

  filter['rooms'].addEventListener('change', function () {
    switch(filter['rooms'].value){
      case 'any' :
        filterPinsByRooms('rooms', 'any');
        break;

      case '1':
        filterPinsByRooms('rooms', 1);
        break;

      case '2':
        filterPinsByRooms('rooms', 2);
        break;

      case '3':
        filterPinsByRooms('rooms', 3);
        break;
    }
  });

  filter['guests'].addEventListener('change', function () {
    switch(filter['guests'].value){
      case 'any' :
        filterPinsByGuests('guests', 'any');
        break;

      case '1':
        filterPinsByGuests('guests', 1);
        break;

      case '2':
        filterPinsByGuests('guests', 2);
        break;
    }
  });

  filter['features']['wifi'].addEventListener('change', function () {
      filterPinsByFeatures('features','wifi');
  });

  filter['features']['dishwasher'].addEventListener('change', function () {
      filterPinsByFeatures('features','dishwasher');
  });

  filter['features']['parcking'].addEventListener('change', function () {
      filterPinsByFeatures('features','parcking');
  });

  filter['features']['washer'].addEventListener('change', function () {
      filterPinsByFeatures('features','elevator');
  });

  filter['features']['elevator'].addEventListener('change', function () {
      filterPinsByFeatures('features','elevator');
  });

  filter['features']['conditioner'].addEventListener('change', function () {
      filterPinsByFeatures('features','conditioner');
  });
})();
