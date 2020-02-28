'use strict';
(function(){
  var map_filter = document.querySelector('.map__filters');
  var filter = {
    all: map_filter.querySelectorAll('.map__filter'),
    type: map_filter.querySelector('#housing-type'),
    price: map_filter.querySelector('#housing-price'),
    rooms: map_filter.querySelector('#housing-rooms'),
    guests: map_filter.querySelector('#housing-guests'),
    features: {
      all: map_filter.querySelectorAll('input[name="features"]'),
      wifi: map_filter.querySelector('#filter-wifi'),
      dishwasher: map_filter.querySelector('#filter-dishwasher'),
      parking: map_filter.querySelector('#filter-parking'),
      washer: map_filter.querySelector('#filter-washer'),
      elevator: map_filter.querySelector('#filter-elevator'),
      conditioner: map_filter.querySelector('#filter-conditioner'),
    }
  }

  var filterPins = function () {

    var filterArray = function (filter_type, array) {
      var filtered_array = array.filter(function (item){
        if (filter_type === 'rooms' || filter_type === 'gusts'){
          return item.offer[filter_type] === Number(filter[filter_type].value) || filter[filter_type].value === 'any';
        }
        else if (filter_type === 'price'){

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
        else{
          return item.offer[filter_type] === filter[filter_type].value || filter[filter_type].value === 'any';
        }
      });
      return filtered_array;
    }

    var filtered_by_type = filterArray('type', server_data);
    var filtered_by_price = filterArray('price', filtered_by_type);
    var filtered_by_rooms = filterArray('rooms', filtered_by_price);
    var filtered_by_guests = filterArray('guests', filtered_by_rooms);

    var filterByFeatures = function (feature, array) {

      if (filter.features[feature].checked === true) {

        var filtered_by_smth = array.filter(function (item) {

          for(var i = 0; i < item.offer.features.length; i++){

            if (item.offer.features[i] === feature) {
              return item;
            }

          }

        });

        return filtered_by_smth;
      }
      else {
        return array;
      }
    }

    var filtered_by_wifi = filterByFeatures('wifi', filtered_by_guests);
    var filtered_by_dishwasher = filterByFeatures('dishwasher', filtered_by_wifi);
    var filtered_by_parking = filterByFeatures('parking', filtered_by_dishwasher);
    var filtered_by_washer = filterByFeatures('washer', filtered_by_parking);
    var filtered_by_elevator = filterByFeatures('elevator', filtered_by_washer);
    var filtered_by_conditioner = filterByFeatures('conditioner', filtered_by_elevator);

    var pins = map.querySelectorAll('.map__pin');

    for(var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }

    addPinsOnMap(filtered_by_conditioner);
  }

  filter['all'].forEach(function (item) {
    item.addEventListener('change', function() {
      debounce(filterPins);
    });
  });

  filter['features']['all'].forEach(function (item) {
    item.addEventListener('change', function() {
      debounce(filterPins);
    });
  });
})();
