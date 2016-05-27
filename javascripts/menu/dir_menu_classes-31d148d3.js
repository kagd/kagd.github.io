(function() {
  var Directive;

  Directive = function($rootScope) {
    var link;
    link = function(scope, ele) {
      return $rootScope.$on('menuToggle', function(event, type) {
        var menuOpen;
        if (type === 'open') {
          menuOpen = true;
        } else if (type === 'close') {
          menuOpen = false;
        }
        return ele.toggleClass('menu-open', menuOpen);
      });
    };
    return {
      restrict: 'EA',
      link: link
    };
  };

  angular.module('kagd').directive('menuClasses', Directive);

  Directive.$inject = ['$rootScope'];

}).call(this);
