//04 Events and validation
const  map = document.querySelector('.map');
const map_area = map.querySelector('.map__pins');
const main_pin = map.querySelector('.map__pin--main');
const main_pin_height = 80;
const pin_height = 18;

const form = document.querySelector('.notice__form');
const fieldsets = form.querySelectorAll('fieldset');
const address = form.querySelector('input[name="address"]');


let activateForm = function(form, fieldsets){
  form.classList.remove('notice__form--disabled');
  for(let i = 0; i < fieldsets.length; i++){
    fieldsets[i].disabled = false;
  }
}

// получаем координаты главной метки для неактивной страницы
let getPinCoordsBeforeStart = function(elem) {
  let box = elem.getBoundingClientRect();

  let coord_x = Math.round(box.top + pageYOffset + (box.height / 2));
  let coord_y = Math.round(box.left + pageXOffset + (box.width / 2));
  address.value = coord_x + " x, " + coord_y + " y;";
}

// получаем координаты элемента в контексте документа
let getPinCoords = function(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset + main_pin_height,
    left: box.left + pageXOffset + (box.width / 2)
  };
}

getPinCoordsBeforeStart(main_pin);

main_pin.addEventListener('mouseup', function(){
   map.classList.remove("map--faded");
   addElements(announcements);
   activateForm(form, fieldsets);
   let coord_x = Math.round(getPinCoords(main_pin).left);
   let coord_y = Math.round(getPinCoords(main_pin).top);
   address.value = coord_x + " x, " + coord_y + " y;";
});

//FORM VALIDATION
const form_price = document.getElementById('price');
const form_type = document.getElementById('type');

const form_checkin = document.getElementById('timein');
const form_checkout = document.getElementById('timeout');

const form_rooms = document.getElementById('room_number');
const form_guests = document.getElementById('capacity');
const form_guests_options = form_guests.children;

// type and price connection
form_type.addEventListener('change', function(){
  switch(form_type.value){

    case "bungalo":
    form_price.min = 0;
    form_price.placeholder = 0;
    break;

    case "flat":
    form_price.min = 1000;
    form_price.placeholder = 1000;
    break;

    case "house":
    form_price.min = 5000;
    form_price.placeholder = 5000;
    break;

    case "palace":
    form_price.min = 10000;
    form_price.placeholder = 10000;
    break;
  }
});

//checkin and checkout connection
form_checkin.addEventListener('change', function(){
  if (form_checkin.value === "12:00"){
    form_checkout.value = "12:00";
  } else if (form_checkin.value === "13:00"){
    form_checkout.value = "13:00";
  } else if (form_checkin.value === "14:00"){
    form_checkout.value = "14:00";
  }
});

form_checkout.addEventListener('change', function(){
  if (form_checkout.value === "12:00"){
    form_checkoin.value = "12:00";
  } else if (form_checkout.value === "13:00"){
    form_checkin.value = "13:00";
  } else if (form_checkout.value === "14:00"){
    form_checkin.value = "14:00";
  }
});

//rooms and guests connection
form_rooms.addEventListener('change', function(){
  switch(form_rooms.value){
    case "1":// 1 комната
      form_guests_options[0].disabled = true;
      form_guests_options[1].disabled = true;
      form_guests_options[2].disabled = false;
      form_guests_options[3].disabled = true;
      form_guests.value = 1;
      break;
    case "2": //2 комнаты
      form_guests_options[0].disabled = true;
      form_guests_options[1].disabled = false;
      form_guests_options[2].disabled = false;
      form_guests_options[3].disabled = true;
      form_guests.value = 2;
      break;
    case "3": // 3 комнаты
      form_guests_options[0].disabled = false;
      form_guests_options[1].disabled = false;
      form_guests_options[2].disabled = false;
      form_guests_options[3].disabled = true;
      form_guests.value = 3;
      break;
    case "100": // 100 комнат
      form_guests_options[0].disabled = true;
      form_guests_options[1].disabled = true;
      form_guests_options[2].disabled = true;
      form_guests_options[3].disabled = false;
      form_guests.value = 0;
      break;
  }
  console.log('click')
})
