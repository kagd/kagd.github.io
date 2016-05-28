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
