(function() {
  var Factory;

  Factory = function() {
    var _store, end, get, start;
    _store = {};
    get = function(id) {
      return _store[id] === true;
    };
    start = function(id) {
      return _store[id] = true;
    };
    end = function(id) {
      return _store[id] = false;
    };
    return {
      get: get,
      start: start,
      end: end,
      init: end
    };
  };

  angular.module('kagd.activity').factory('activityFactory', Factory);

}).call(this);
