'use strict';
(function(){
  var IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var avatar_choser = document.querySelector('input[id="avatar"]'); //<input> элемент с атрибутом type="file" позволяет пользователю выбрать один файл или более из файлового хранилища своего устройства. После выбора эти файлы могут быть загружены на сервер при помощи формы, или обработаны JavaScript и File API.
  var avatar_preview = document.querySelector('.notice__preview img');

  var photos_choser = document.querySelector('input[id="images"]');
  var photos_container = document.querySelector('.form__photo-container');

  avatar_choser.addEventListener('change', function () {
    var file = avatar_choser.files[0]; //Обращение к одному выбранному файлу с использованием классической DOM-модели. Если пользователь выбирает только один файл, ему соответствует первый файл в списке.
    var file_name = file.name.toLowerCase(); //Метод toLowerCase() возвращает значение строки, на которой он был вызван, преобразованное в нижний регистр.

    var matches = IMAGE_TYPES.some(function (it) { //Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
      return file_name.endsWith(it); //Метод endsWith() определяет, заканчивается ли строка символами другой строки, возвращая, соотвественно, true или false.
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function (){
        avatar_preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photos_choser.addEventListener('change', function () {
    var file = photos_choser.files[0];
    var file_name = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (it) { 
      return file_name.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function (){
        var user_photo = document.createElement('img');
        user_photo.classList.add('form__photo');
        user_photo.src = reader.result;
        photos_container.appendChild(user_photo);
      });

      reader.readAsDataURL(file);
    }
  });
})();
