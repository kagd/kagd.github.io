(function() {
  var Controller;

  Controller = function(diabloService) {
    var container, ctrl, response;
    ctrl = this;
    response = diabloService.get();
    ctrl.heroes = response.heroes;
    ctrl.profile = response.profile;
    ctrl.heroClasses = function(hero) {
      return hero["class"] + "-" + hero.gender;
    };
    container = document.getElementById('heroes-wrapper');
    Ps.initialize(container);
  };

  angular.module('kagd').controller('DiabloController', Controller);

  Controller.$inject = ['diabloService'];

}).call(this);
