(function() {
  'use strict';
  var Helpers;

  Helpers = function() {
    var capitalize, titleize, uncapitalize, underscore;
    capitalize = function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };
    uncapitalize = function(word) {
      return word.charAt(0).toLowerCase() + word.slice(1);
    };
    titleize = function(string) {
      var capitalizedWords, cleanTitle, words;
      cleanTitle = string.replace(/[ \-_]+/g, ' ');
      words = cleanTitle.replace(/([A-Z])/g, " $&").trim().split(' ');
      capitalizedWords = words.map(function(word) {
        return capitalize(word);
      });
      return capitalizedWords.join(' ');
    };
    underscore = function(string) {
      var newString;
      newString = string.replace(/([A-Z])/g, function($1) {
        return "_" + ($1.toLowerCase());
      });
      return newString.replace(/^_/, '').replace(/-/g, '_');
    };
    return {
      capitalize: capitalize,
      uncapitalize: uncapitalize,
      titleize: titleize,
      underscore: underscore
    };
  };

  angular.module('string-helpers', []).factory('stringHelpers', Helpers);

}).call(this);
