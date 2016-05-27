(function() {
  var Controller;

  Controller = function() {
    var ctrl;
    ctrl = this;
    ctrl.open = false;
    ctrl.toggle = function() {
      return ctrl.open = !ctrl.open;
    };
  };

  angular.module('kagd').component('kagdTagsActionsheet', {
    templateUrl: '/templates/tags_actionsheet/tags_actionsheet_component.html',
    controller: Controller
  });

}).call(this);
