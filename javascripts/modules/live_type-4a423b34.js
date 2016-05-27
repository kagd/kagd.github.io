(function() {
  var Directive;

  Directive = function($timeout) {
    var getRandomMs, link;
    getRandomMs = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    link = function(scope) {
      var chars;
      scope.string = '';
      chars = scope.livetype.split('');
      return chars.reduce(function(lastMs, currentChar, idx) {
        var newMs;
        newMs = lastMs + getRandomMs(50, 750);
        $timeout(function() {
          return scope.string += currentChar;
        }, newMs);
        return newMs;
      }, 0);
    };
    return {
      link: link,
      restrict: 'A',
      template: '{{ string }}<span class="livetype-cursor">|</span>',
      scope: {
        livetype: '@'
      }
    };
  };

  angular.module('liveType', []).directive('livetype', Directive);

  Directive.$inject = ['$timeout'];

}).call(this);
