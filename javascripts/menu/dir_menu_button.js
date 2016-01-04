(function() {
  var Directive;

  Directive = function($rootScope) {
    var link;
    link = function(scope, element) {
      var menuOpen;
      menuOpen = false;
      return element.on('click', function() {
        var message;
        menuOpen = !menuOpen;
        message = menuOpen ? 'open' : 'close';
        return $rootScope.$broadcast('menuToggle', message);
      });
    };
    return {
      restrict: 'EA',
      link: link
    };
  };

  angular.module('kagd').directive('menuButton', Directive);

  Directive.$inject = ['$rootScope'];

}).call(this);
