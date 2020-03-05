// 00 Заносим все служебные функции, конастанты и объекты в свойства (или мотоды) объекта window, чтобы использовать глобально
'use strict';

(function () {
    window.pageElements = {
        map: document.querySelector('.map'),
        mapElements: {
            area: document.querySelector('.map__pins'),
            mainPin: document.querySelector('.map__pin--main'),
            mainPinHeight: 80,
            pinHeight: 18,
        },
        form: document.querySelector('.notice__form'),
        formElements: {
            fieldsets: document.querySelectorAll('fieldset'),
            address: document.querySelector('input[name="address"]'),
            price: document.querySelector('#price'),
            type: document.querySelector('#type'),
            checkin: document.querySelector('#timein'),
            checkout: document.querySelector('#timeout'),
            rooms: document.querySelector('#room_number'),
            guests: document.querySelector('#capacity'),
            guestsOptions: document.querySelectorAll('#capacity option')
        }
    }
})();
