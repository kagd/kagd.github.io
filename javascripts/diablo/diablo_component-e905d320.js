(function() {
  var Controller;

  Controller = function(diabloService, Ps, activityService, $timeout) {
    var ctrl;
    ctrl = this;
    ctrl.activity = activityService.init();
    ctrl.activity.start();
    diabloService.get().then(function(response) {
      ctrl.heroes = response.data.heroes;
      ctrl.profile = response.data.profile;
      ctrl.activity.stop();
      return $timeout(function() {
        var container;
        container = document.getElementById('heroes-wrapper');
        return Ps.initialize(container);
      }, 100);
    })["finally"](function() {
      return ctrl.activity.stop();
    });
    ctrl.heroClasses = function(hero) {
      return hero["class"] + "-" + hero.gender;
    };
  };

  Controller.$inject = ['diabloService', 'Ps', 'activityService', '$timeout'];

  angular.module('kagd').component('kagdDiablo', {
    templateUrl: '/templates/diablo/diablo_component.html',
    controller: Controller
  });

}).call(this);
