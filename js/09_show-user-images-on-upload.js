// 09 Добавляем возможность видеть загружаемые в форму фотографии и аватар при заполеннии формы
'use strict';

(function () {
  var IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var avatarСhoser = document.querySelector('input[id="avatar"]');
  var avatarPreview = document.querySelector('.notice__preview img');

  var photosChoser = document.querySelector('input[id="images"]');
  var photosContainer = document.querySelector('.form__photo-container');

  avatarСhoser.addEventListener('change', function () {
    var file = avatarСhoser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosChoser.addEventListener('change', function () {
    var file = photosChoser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var userPhoto = document.createElement('img');
        userPhoto.classList.add('form__photo');
        userPhoto.src = reader.result;
        photosContainer.appendChild(userPhoto);
      });

      reader.readAsDataURL(file);
    }
  });
})();
