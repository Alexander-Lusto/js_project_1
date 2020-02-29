// 08 Устраняем дребезг при быстром переключении фильтров
'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimer;
  window.debounce = function (fun) {
    if (lastTimer) {
      window.clearTimeout(lastTimer);
    }
    lastTimer = window.setTimeout(function () {
      fun();
    }, DEBOUNCE_INTERVAL);
  };
})();
