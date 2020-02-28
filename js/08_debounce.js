'use strict';
(function(){
  var DEBOUNCE_INTERVAL = 500; //ms
  var last_timer;
  window.debounce = function (fun) {
    if (last_timer) {
      window.clearTimeout(last_timer);
    }
    last_timer = window.setTimeout(function () {
      fun();
    }, DEBOUNCE_INTERVAL);
  }
})();
