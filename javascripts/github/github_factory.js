(function() {
  var Factory;

  Factory = function() {
    var stats;
    stats = {};
    return {
      stats: stats
    };
  };

  angular.module('kagd').factory('githubFactory', Factory);

}).call(this);
