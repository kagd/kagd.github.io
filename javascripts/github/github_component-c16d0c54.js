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

  angular.module('stringHelpers', []).factory('stringHelpers', Helpers);

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

  angular.module('jsonHelpers', ['stringHelpers']).factory('jsonHelpers', Helpers);

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

  angular.module('serviceHelpers', ['jsonHelpers']).factory('serviceHelpers', ServiceHelpers);

  ServiceHelpers.$inject = ['jsonHelpers'];

}).call(this);
(function() {
  var Service;

  Service = function($http, githubFactory, serviceHelpers, API_HOST) {
    var service;
    service = this;
    service.get = function() {
      $http.get(API_HOST + "api/github").then(function(response) {
        return serviceHelpers.populateObjectFromResponse(githubFactory.stats, response.data);
      });
      return {
        stats: githubFactory.stats
      };
    };
    return service;
  };

  angular.module('kagd').service('githubService', Service);

  Service.$inject = ['$http', 'githubFactory', 'serviceHelpers', 'API_HOST'];

}).call(this);
(function() {
  var Controller;

  Controller = function(githubService, $sce) {
    var ctrl, response;
    ctrl = this;
    response = githubService.get();
    ctrl.stats = response.stats;
    ctrl.shortSha = function(sha) {
      if (sha) {
        return sha.slice(0, 10);
      }
    };
    ctrl.lastCommitMessage = function() {
      return $sce.trustAsHtml("\"" + ctrl.stats.lastCommit.message + "\"");
    };
  };

  Controller.$inject = ['githubService', '$sce'];

  angular.module('kagd').component('kagdGithub', {
    templateUrl: '/templates/github/github_component.html',
    controller: Controller
  });

}).call(this);
