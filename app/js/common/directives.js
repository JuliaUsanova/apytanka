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
           controller: ['$scope', '$http', '$location', function($scope, $http, $location){

               $scope.filteredList = [];

               $scope.filters = {
                   byCountries: {
                       list: [{id: 'all', name: 'Усе'}],
                       selected: 'all'
                   },
                   search: '',
                   byDate: {
                       options: [{value: 0, name: 'Спачатку новыя'}, {value: 1, name: 'Спачатку старыя'}, {value: 'all', name: 'Не мае сэнса'}],
                       selected: 'all'
                   },
                   byRating: {
                       options: [{value: 0, name: 'Спачатку з вышэйшым'}, {value: 1, name: 'Спачатку з ніжэйшым'}, {value: 'all', name: 'Не мае сэнса'}],
                       selected: 'all'
                   }
               };

               var getData = function(){
                   var params;
                   var requestMethod;

                   var parseUrl = function(url){
                       requestMethod = $location.path();
                       params = $location.search();
                   };
                   var doRequest = function(url){
                       parseUrl(url);
//                            return $http({
//                                method: requestMethod,
//                                url: 'https:...' + params
//                            }).success(function(data){
//                                $scope.filteredList = data;
//                              for ( var i = 0; i < data.length; i++ ) {
//                              if( $scope.filters.byCountries.list.indexOf(data[i].user.country) != -1 ) return;
//                              $scope.filters.byCountries.list.push(data[i].user.country);
//                              };
//                            });

                       $scope.filteredList = [
                           {id: '1', user: {name: 'Ivan', surname: 'Ivanov', id: 123, avatar: 'css/images/563469251.png', country: {id: 2, name: 'Thailand'}, city: 'Bangkok'}, title: "First", content: 'bla-bla-bla',
                               date: 634600801000, rating: {likes: [2, 12, 125, 45, 85, 44], dislikes: [14,58,21]}},
                           {id: '2', user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: 'css/images/563469251.png', country: {id: 1, name: 'Italy'}, city: 'Rome'}, title: "AHAHAHAH",
                               content: 'Fortune, which has a great deal of power in other matters but especially in war, can bring about great changes in a situation through very slight forces',
                               date: 634600801001, rating: {likes: [14, 12, 115, 15, 84, 42,64], dislikes: [18,88,26,53]}},
                           {id: '3', user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: 'css/images/563469251.png', country: {id: 3, name: 'Germany'}, city: 'Berlin'}, title: "fsdadfg",
                               content: 'What we wish, we readily believe, and what we ourselves think, we imagine others think also',
                               date: 634600801401, rating: {likes: [1, 12, 10, 13, 8], dislikes: [18]}}
                       ];
                   };

                   return doRequest;
               };

               $scope.updateLocation = function (obj){

                   var searchObj = {};

                   var keyArr = Object.keys(obj);
                   for ( var i=0; i < keyArr.length; i++ ) {
                       if (keyArr[i] == 'search' && obj[keyArr[i]] != '') {
                           searchObj[keyArr[i]] = obj[keyArr[i]];
                       }
                       else if (keyArr[i] != 'search' && typeof(obj[keyArr[i]]['selected']) == 'number') {
                           searchObj[keyArr[i]] = obj[keyArr[i]].selected;
                       }
                       else {
                           searchObj['selected'] = 'all'
                       }
                   }
                   $location.search(searchObj);
                   getData();
               };

           }],
           link: function($scope, iElement, iAttrs, ctrl){

               $scope.$watch('filters', function(newVal, oldVal){
                   $scope.updateLocation(newVal);
               }, true);


           },
           transclude: true
       }

   }]);

})();
