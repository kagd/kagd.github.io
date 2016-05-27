(function() {
  var Controller;

  Controller = function(diabloService, Ps) {
    var container, ctrl, response;
    ctrl = this;
    response = diabloService.get();
    ctrl.heroes = response.heroes;
    ctrl.profile = response.profile;
    ctrl.heroClasses = function(hero) {
      return hero["class"] + "-" + hero.gender;
    };
    container = document.getElementById('heroes-wrapper');
    ctrl.$onInit = function() {
      return Ps.initialize(container);
    };
  };

  Controller.$inject = ['diabloService', 'Ps'];

  angular.module('kagd').component('kagdDiablo', {
    templateUrl: '/templates/diablo/diablo_component.html',
    controller: Controller
  });

}).call(this);
