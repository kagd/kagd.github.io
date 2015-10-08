(function() {
  var Controller;

  Controller = function($http, API_HOST, jsonHelpers) {
    var ctrl;
    ctrl = this;
    ctrl.stats = null;
    ctrl.shortSha = function(sha) {
      if (sha) {
        return sha.slice(0, 10);
      }
    };
    $http.get(API_HOST + "api/github").then(function(response) {
      return ctrl.stats = jsonHelpers.objectKeysToCamelCase(response.data);
    });
  };

  angular.module('kagd').controller('GithubController', Controller);

  Controller.$inject = ['$http', 'API_HOST', 'jsonHelpers'];

}).call(this);
