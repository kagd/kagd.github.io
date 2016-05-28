(function() {
  var Service;

  Service = function(activityFactory, ACTIVITY_EVENTS, $rootScope) {
    var ActivityIndicator, _broadcast, _service;
    _service = this;
    ActivityIndicator = function(id) {
      var indicator;
      indicator = this;
      indicator.id = id;
      indicator.start = function() {
        return _service.start(id);
      };
      indicator.stop = function() {
        return _service.end(id);
      };
      indicator.isActive = function() {
        return _service.isActive(id);
      };
      return this;
    };
    _service.init = function(id) {
      var _id;
      _id = id || (Math.random() * (100000 - 10000) + 10000).toString();
      activityFactory.init(_id);
      return new ActivityIndicator(_id);
    };
    _service.start = function(id) {
      activityFactory.start(id);
      return _broadcast(ACTIVITY_EVENTS.init, id);
    };
    _service.isActive = function(id) {
      return activityFactory.get(id);
    };
    _service.end = function(id) {
      activityFactory.end(id);
      return _broadcast(ACTIVITY_EVENTS.complete, id);
    };
    _broadcast = function(eventName, id) {
      return $rootScope.$broadcast(eventName, {
        id: id
      });
    };
    return _service;
  };

  Service.$inject = ['activityFactory', 'ACTIVITY_EVENTS', '$rootScope'];

  angular.module('kagd.activity').service('activityService', Service);

}).call(this);
