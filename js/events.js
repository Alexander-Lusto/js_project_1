//04 Events and validation
const map = document.querySelector('.map');
const  map_elements = {
  area: map.querySelector('.map__pins'),
  main_pin: map.querySelector('.map__pin--main'),
  main_pin_height: 80,
  pin_height: 18,
}

const form =  document.querySelector('.notice__form');
const form_elements = {
  fieldsets: form.querySelectorAll('fieldset'),
  address: form.querySelector('input[name="address"]'),
  price: form.querySelector('#price'),
  type: form.querySelector('#type'),
  checkin: form.querySelector('#timein'),
  checkout: form.querySelector('#timeout'),
  rooms: form.querySelector('#room_number'),
  guests: form.querySelector('#capacity'),
  guests_options: form.querySelectorAll('#capacity option'),
};

console.log(form_elements);

let activateForm = function(){
  form.classList.remove('notice__form--disabled');
  for(let i = 0; i < form_elements.fieldsets.length; i++){
    form_elements.fieldsets[i].disabled = false;
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
    top: box.top + pageYOffset + map_elements.main_pin_height,
    left: box.left + pageXOffset + (box.width / 2)
  };
}

getPinCoordsBeforeStart(map_elements.main_pin);

//функция которая вешает слушатель событий
let addListener = function(element, event_type, call_back){
  element.addEventListener(event_type, call_back);
}

//activate page
let activatePage = function(){
  map.classList.remove("map--faded");
  addElements(announcements);
  activateForm(form, form_elements.fieldsets);
  let coord_x = Math.round(getPinCoords(map_elements.main_pin).left);
  let coord_y = Math.round(getPinCoords(map_elements.main_pin).top);
  address.value = coord_x + " x, " + coord_y + " y;";
}
addListener(map_elements.main_pin, 'mouseup', activatePage);

//FORM VALIDATION
let connectPriceAndType = function(){
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
let connectRoomsAndGuests =  function(){
  for(let i = 0; i < form_elements.guests_options.length; i++){
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
