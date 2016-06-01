(function() {
  angular.module('kagd', ['serviceHelpers', 'perfect_scrollbar', 'liveType', 'perfectScrollbar', 'kagd.activity']).constant('API_HOST', window.env.API_HOST);

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
(function() {
  angular.module('perfectScrollbar', []).factory('Ps', function() {
    return window.Ps;
  });

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
(function() {
  var Controller;

  Controller = function(diabloService, Ps, activityService, $timeout) {
    var ctrl;
    ctrl = this;
    ctrl.activity = activityService.init();
    ctrl.activity.start();
    diabloService.get().then(function(response) {
      ctrl.heroes = response.data.heroes;
      ctrl.profile = response.data.profile;
      ctrl.activity.stop();
      return $timeout(function() {
        var container;
        container = document.getElementById('heroes-wrapper');
        return Ps.initialize(container);
      }, 100);
    })["finally"](function() {
      return ctrl.activity.stop();
    });
    ctrl.heroClasses = function(hero) {
      return hero["class"] + "-" + hero.gender;
    };
  };

  Controller.$inject = ['diabloService', 'Ps', 'activityService', '$timeout'];

  angular.module('kagd').component('kagdDiablo', {
    templateUrl: '/templates/diablo/diablo_component.html',
    controller: Controller
  });

}).call(this);
(function() {
  var Service;

  Service = function($http, API_HOST) {
    var service;
    service = this;
    service.get = function() {
      return $http.get(API_HOST + "api/diablo");
    };
    return service;
  };

  angular.module('kagd').service('diabloService', Service);

  Service.$inject = ['$http', 'API_HOST'];

}).call(this);
(function() {
  var Service;

  Service = function($http, API_HOST) {
    var service;
    service = this;
    service.get = function() {
      return $http.get(API_HOST + "api/github");
    };
    return service;
  };

  angular.module('kagd').service('githubService', Service);

  Service.$inject = ['$http', 'API_HOST'];

}).call(this);
(function() {
  var Controller;

  Controller = function(githubService, $sce, activityService) {
    var ctrl;
    ctrl = this;
    ctrl.activity = activityService.init();
    ctrl.activity.start();
    githubService.get().then(function(response) {
      return ctrl.stats = response.data;
    })["finally"](function() {
      return ctrl.activity.stop();
    });
    ctrl.shortSha = function(sha) {
      if (sha) {
        return sha.slice(0, 10);
      }
    };
    ctrl.lastCommitMessage = function() {
      return $sce.trustAsHtml("\"" + ctrl.stats.last_commit.message + "\"");
    };
  };

  Controller.$inject = ['githubService', '$sce', 'activityService'];

  angular.module('kagd').component('kagdGithub', {
    templateUrl: '/templates/github/github_component.html',
    controller: Controller
  });

}).call(this);
(function() {
  var Controller;

  Controller = function($http, $sce, activityService) {
    var ctrl;
    ctrl = this;
    ctrl.answers = [];
    ctrl.questions = [];
    ctrl.activity = activityService.init();
    ctrl.toHTML = function(str) {
      return $sce.trustAsHtml(str);
    };
    ctrl.activity.start();
    $http.get('https://api.stackexchange.com/2.2/users/1329299/answers?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=default').then(function(response) {
      var ids;
      ctrl.answers = response.data.items;
      ids = ctrl.answers.map(function(answer) {
        return answer.question_id;
      });
      return $http.get("https://api.stackexchange.com/2.2/questions/" + (ids.join(';')) + "?order=desc&sort=activity&site=stackoverflow").then(function(response) {
        ctrl.questions = response.data.items;
        return ctrl.questions.forEach(function(question) {
          return ctrl.answers.forEach(function(answer) {
            if (answer.question_id === question.question_id) {
              return question.answer = answer;
            }
          });
        });
      })["finally"](function() {
        return ctrl.activity.stop();
      });
    })["finally"](function() {
      return ctrl.activity.stop();
    });
  };

  Controller.$inject = ['$http', '$sce', 'activityService'];

  angular.module('kagd').component('kagdStackOverflow', {
    templateUrl: '/templates/stack_overflow/stack_overflow_component.html',
    controller: Controller
  });

}).call(this);
(function() {
  var Controller;

  Controller = function() {
    var ctrl;
    ctrl = this;
    ctrl.open = false;
    ctrl.toggle = function() {
      return ctrl.open = !ctrl.open;
    };
  };

  angular.module('kagd').component('kagdTagsActionsheet', {
    templateUrl: '/templates/tags_actionsheet/tags_actionsheet_component.html',
    controller: Controller
  });

}).call(this);
(function() {
  angular.module('kagd.activity', []);

}).call(this);
(function() {
  var Controller;

  Controller = function($scope, activityService) {
    var ctrl;
    ctrl = this;
    ctrl.active = activityService.isActive;
    return null;
  };

  Controller.$inject = ['$scope', 'activityService'];

  angular.module('kagd.activity').component('kagdActivity', {
    bindings: {
      id: '=id'
    },
    controller: Controller,
    template: '<div class="activity-container" ng-if="$ctrl.active( $ctrl.id )"> <span class="bar"></span> </div>'
  });

}).call(this);
(function() {
  var Factory;

  Factory = function() {
    var _store, end, get, start;
    _store = {};
    get = function(id) {
      return _store[id] === true;
    };
    start = function(id) {
      return _store[id] = true;
    };
    end = function(id) {
      return _store[id] = false;
    };
    return {
      get: get,
      start: start,
      end: end,
      init: end
    };
  };

  angular.module('kagd.activity').factory('activityFactory', Factory);

}).call(this);
(function() {
  var Service;

  Service = function(activityFactory, ACTIVITY_EVENTS, $rootScope) {
    var ActivityIndicator, _broadcast, _service;
    _service = this;
    ActivityIndicator = function(id) {
      var indicator;
      indicator = this;
      indicator.id = id;
      indicator.start = function() {
        return _service.start(id);
      };
      indicator.stop = function() {
        return _service.end(id);
      };
      indicator.isActive = function() {
        return _service.isActive(id);
      };
      return this;
    };
    _service.init = function(id) {
      var _id;
      _id = id || (Math.random() * (100000 - 10000) + 10000).toString();
      activityFactory.init(_id);
      return new ActivityIndicator(_id);
    };
    _service.start = function(id) {
      activityFactory.start(id);
      return _broadcast(ACTIVITY_EVENTS.init, id);
    };
    _service.isActive = function(id) {
      return activityFactory.get(id);
    };
    _service.end = function(id) {
      activityFactory.end(id);
      return _broadcast(ACTIVITY_EVENTS.complete, id);
    };
    _broadcast = function(eventName, id) {
      return $rootScope.$broadcast(eventName, {
        id: id
      });
    };
    return _service;
  };

  Service.$inject = ['activityFactory', 'ACTIVITY_EVENTS', '$rootScope'];

  angular.module('kagd.activity').service('activityService', Service);

}).call(this);
(function() {
  angular.module('kagd.activity').constant('ACTIVITY_EVENTS', {
    init: 'activity:init',
    complete: 'activity:complete'
  });

}).call(this);
