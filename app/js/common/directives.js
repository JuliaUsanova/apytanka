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

    app.directive('apytanka', ['ApytankaFactory', function(ApytankaFactory){
          return {
              restrict: 'EA',
              require: '^ngModel',
              //scope: {
              //    apytanka: '='
              //},
              templateUrl: '../partials/apytanka.html',
              link: function(scope, el, attr, ctrl){
                  scope.apytanka = new ApytankaFactory(scope.apytanka);
              },
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

   app.directive('filter', ['$http', function($http){
       return{
           restrict: 'EA',
           templateUrl: '../partials/filter.html',
           controller: ['$scope', '$location', function($scope, $location){

               $scope.filterParams = {
                   byCountries: {
                       list: [{id: 'all', name: 'Усе'}]
                   },
                   search: '',
                   page:  1,
                   byDate: {
                       options: [{value: 0, name: 'Спачатку новыя'}, {value: 1, name: 'Спачатку старыя'}, {value: 'all', name: 'Не мае сэнса'}]
                   },
                   byRating: {
                       options: [{value: 0, name: 'Спачатку з вышэйшым'}, {value: 1, name: 'Спачатку з ніжэйшым'}, {value: 'all', name: 'Не мае сэнса'}]
                   }
               };

               $scope.filterBy = {'country': 'all', 'search': '', 'page': 1, date: 'all', rating: 'all'};

               var setParams = function (obj1, obj2){
                   var keyArr = Object.keys(obj1);
                   for ( var i=0; i < keyArr.length; i++ ) {
                       if (keyArr[i] == 'search' && obj1[keyArr[i]] != '') {
                           obj2[keyArr[i]] = obj1[keyArr[i]];
                       }
                       else if (keyArr[i] != 'search' && !isNaN(parseInt(obj1[keyArr[i]])) ) {
                           obj2[keyArr[i]] = obj1[keyArr[i]];
                       }
                   }
               };

               setParams($location.search(), $scope.filterBy);
               if ( jQuery.isEmptyObject($location.search()) ) $location.search({page: 1});

               $scope.updateLocation = function (urlObj){
                   var filtersObj = {};
                   setParams(urlObj, filtersObj);
                   jQuery.isEmptyObject(filtersObj) ? $location.search({page: 1}) : $location.search(filtersObj);
               };

           }],
           link: function($scope, iElement, iAttrs, ctrl){

               $scope.$watch('filterBy', function(newVal, oldVal){
                   if ( !angular.equals(newVal, oldVal) ) $scope.updateLocation(newVal);
               }, true);


           },
           transclude: true
       }

   }]);

})();
