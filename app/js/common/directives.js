/**
 * Created by юля on 20.11.2014.
 */
(function(){

    var app = angular.module('customDirectives', []);

    app.directive('customOnChange', ['$timeout', function($timeout) {
        'use strict';

        return {
            restrict: "A",

            scope: {
                handler: '&'
            },
            link: function(scope, element){

                element.change(function(event){
                    scope.$apply(function(){
                        var params = {event: event, el: element};
                        scope.handler({params: params});
                        $timeout(function(){}, 500);
                    });
                });
            }

        };
    }]);

    app.directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });

    app.directive('apytanka', [function(){
          return {
              restrict: 'EA',
              require: '^ngModel',
              //scope: {
              //    apytanka: '='
              //},
              templateUrl: '../partials/apytanka.html',
              replace: true
          }
    }]);

    app.directive('apytankaComment', [function(){
        return {
            restrict: 'EA',
            templateUrl: '../partials/apytanka-comment.html',
            replace: true
        }
    }]);

})();
