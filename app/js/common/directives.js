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

})();
