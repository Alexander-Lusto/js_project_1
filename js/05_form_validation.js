//05 FORM VALIDATION
'use strict';
(function(){
  var connectPriceAndType = function(){
    switch(form_elements.type.value){
      case "bungalo":
      form_elements.price.min = 0;
      form_elements.price.placeholder = 0;
      break;

      case "flat":
      form_elements.price.min = 1000;
      form_elements.price.placeholder = 1000;
      break;

      case "house":
      form_elements.price.min = 5000;
      form_elements.price.placeholder = 5000;
      break;

      case "palace":
      form_elements.price.min = 10000;
      form_elements.price.placeholder = 10000;
      break;
    }
  }
  addListener(form_elements.type, 'change', connectPriceAndType);

  //checkin and checkout connection
   var connectTime = function(time_1, time_2){
     time_2.value = time_1.value;
  }
  addListener(form_elements.checkin, 'change',  () => connectTime(form_elements.checkin, form_elements.checkout));
  addListener(form_elements.checkout, 'change', () => connectTime(form_elements.checkout, form_elements.checkin));

  //rooms and guests connection
  var connectRoomsAndGuests =  function(){
    for(var i = 0; i < form_elements.guests_options.length; i++){
      form_elements.guests_options[i].disabled = true;
    }
    switch(form_elements.rooms.value){
      case "1":// 1 комната
        form_elements.guests_options[2].disabled = false;
        form_elements.guests.value = 1;
        break;
      case "2": //2 комнаты
        form_elements.guests_options[1].disabled = false;
        form_elements.guests_options[2].disabled = false;
        form_elements.guests.value = 2;
        break;
      case "3": // 3 комнаты
        form_elements.guests_options[0].disabled = false;
        form_elements.guests_options[1].disabled = false;
        form_elements.guests_options[2].disabled = false;
        form_elements.guests.value = 3;
        break;
      case "100": // 100 комнат
        form_elements.guests_options[3].disabled = false;
        form_elements.guests.value = 0;
        break;
    }
  }
  addListener(form_elements.rooms, 'change', connectRoomsAndGuests);

  // submit form validation
  form.addEventListener('invalid', function(evt){
    evt.target.classList.add('invalid');
  }, true);

  form.addEventListener('change', function(evt){
    evt.target.classList.remove('invalid');
  }, true);

})();
