(function() {
  angular.module('kagd.activity', []);

}).call(this);
(function() {
  var Controller;

  Controller = function($scope, activityService) {
    var ctrl;
    ctrl = this;
    ctrl.active = activityService.isActive;
    return null;
  };

  Controller.$inject = ['$scope', 'activityService'];

  angular.module('kagd.activity').component('kagdActivity', {
    bindings: {
      id: '=id'
    },
    controller: Controller,
    template: '<div class="activity-container" ng-if="$ctrl.active( $ctrl.id )"> <span class="bar"></span> </div>'
  });

}).call(this);
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
(function() {
  angular.module('kagd.activity').constant('ACTIVITY_EVENTS', {
    init: 'activity:init',
    complete: 'activity:complete'
  });

}).call(this);
