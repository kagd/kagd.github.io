(function() {
  var ApplicationController;

  angular.module('kagd', ['foundation', 'serviceHelpers', 'perfect_scrollbar']);

  ApplicationController = function() {
    var ctrl;
    ctrl = this;
    ctrl.menuOpen = false;
    ctrl.toggleMenu = function() {
      return ctrl.menuOpen = !ctrl.menuOpen;
    };
    ctrl.closeMenu = function() {
      return ctrl.menuOpen = false;
    };
  };

  angular.module('kagd').controller('ApplicationController', ApplicationController);

  angular.module('kagd').run(function($templateCache) {
    $templateCache.put('components/actionsheet/actionsheet.html', '<div class="action-sheet-container" ng-transclude></div>');
    $templateCache.put('components/actionsheet/actionsheet-button.html', '<div> <a href="#" class="button" ng-if="title.length > 0">{{ title }}</a> <div ng-transclude></div> </div>');
    return $templateCache.put('components/actionsheet/actionsheet-content.html', '<div class="action-sheet {{ position }}" ng-class="{\'is-active\': active}"> <div ng-transclude></div> </div>');
  });

}).call(this);
(function() {
  angular.module('kagd').constant('API_HOST', 'http://localhost:5000/');

}).call(this);
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
(function() {
  'use strict';
  var Helpers,
    hasProp = {}.hasOwnProperty;

  Helpers = function(stringHelpers) {
    var objectKeysToCamelCase, objectKeysToSnakeCase;
    objectKeysToCamelCase = function(object) {
      var key, newKey, newObj, value;
      newObj = null;
      if (Array.isArray(object)) {
        newObj = object.map(function(item) {
          return objectKeysToCamelCase(item);
        });
      } else if (object instanceof Object) {
        newObj = {};
        for (key in object) {
          if (!hasProp.call(object, key)) continue;
          value = object[key];
          newKey = stringHelpers.uncapitalize(stringHelpers.titleize(key).replace(/\s+/g, ''));
          newObj[newKey] = objectKeysToCamelCase(value);
        }
      } else {
        newObj = object;
      }
      return newObj;
    };
    objectKeysToSnakeCase = function(object) {
      var key, newKey, newObj, value;
      newObj = null;
      if (Array.isArray(object)) {
        newObj = object.map(function(item) {
          return objectKeysToSnakeCase(item);
        });
      } else if (_.isObject(object)) {
        newObj = {};
        for (key in object) {
          if (!hasProp.call(object, key)) continue;
          value = object[key];
          newKey = stringHelpers.underscore(key).replace(/\s+/g, '');
          newObj[newKey] = objectKeysToSnakeCase(value);
        }
      } else {
        newObj = object;
      }
      return newObj;
    };
    return {
      objectKeysToCamelCase: objectKeysToCamelCase,
      objectKeysToSnakeCase: objectKeysToSnakeCase
    };
  };

  angular.module('json-helpers', ['string-helpers']).factory('jsonHelpers', Helpers);

  Helpers.$inject = ['stringHelpers'];

}).call(this);
(function() {
  var ServiceHelpers,
    hasProp = {}.hasOwnProperty;

  ServiceHelpers = function(jsonHelpers) {
    var populateObjectFromResponse;
    populateObjectFromResponse = function(model, data) {
      var formattedData, key, results, value;
      formattedData = jsonHelpers.objectKeysToCamelCase(data);
      if (Array.isArray(formattedData)) {
        return formattedData.forEach(function(item) {
          return model.push(item);
        });
      } else {
        results = [];
        for (key in formattedData) {
          if (!hasProp.call(formattedData, key)) continue;
          value = formattedData[key];
          results.push(model[key] = value);
        }
        return results;
      }
    };
    return {
      populateObjectFromResponse: populateObjectFromResponse
    };
  };

  angular.module('serviceHelpers', ['json-helpers']).factory('serviceHelpers', ServiceHelpers);

  ServiceHelpers.$inject = ['jsonHelpers'];

}).call(this);
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
(function() {
  var Service;

  Service = function($http, diabloFactory, serviceHelpers, API_HOST) {
    var service;
    service = this;
    service.get = function() {
      $http.get(API_HOST + "api/diablo").then(function(response) {
        serviceHelpers.populateObjectFromResponse(diabloFactory.heroes, response.data.heroes);
        return serviceHelpers.populateObjectFromResponse(diabloFactory.profile, response.data.profile);
      });
      return {
        heroes: diabloFactory.heroes,
        profile: diabloFactory.profile
      };
    };
    return service;
  };

  angular.module('kagd').service('diabloService', Service);

  Service.$inject = ['$http', 'diabloFactory', 'serviceHelpers', 'API_HOST'];

}).call(this);
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
