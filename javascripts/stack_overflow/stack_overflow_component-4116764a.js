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
