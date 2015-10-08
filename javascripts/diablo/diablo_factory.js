(function() {
  var Factory;

  Factory = function() {
    var heroes, profile;
    heroes = [];
    profile = {};
    return {
      heroes: heroes,
      profile: profile
    };
  };

  angular.module('kagd').factory('diabloFactory', Factory);

}).call(this);
