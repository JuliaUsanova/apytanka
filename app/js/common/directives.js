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
           controller: ['$scope', '$location', 'filterService', function($scope, $location, filterService){

               $scope.filterParams = {
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

               var location = $location.search();

               var locationParams = Object.keys(location);

               for ( var i=0; i < locationParams.length; i++ ) {
                   if (locationParams[i] == 'search' && location[locationParams[i]] != '') {
                       $scope.filterParams[locationParams[i]] = location[locationParams[i]];
                   }
                   else if (locationParams[i] != 'search' && typeof(location[locationParams[i]]) == 'number') {
                       $scope.filterParams[locationParams[i]].selected = location[locationParams[i]];
                   }
               }

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
                   }
                   if ( jQuery.isEmptyObject(searchObj) ) searchObj['selected'] = 'all';

                   $location.search(searchObj);

               };

               $scope.$watch($location, function(newVal, oldVal){
//                filterService.list('apytanki', $location.search()).success(function(data){
//                                $scope.filteredList = data;
//                              for ( var i = 0; i < data.length; i++ ) {
//                              if( $scope.filterParams.byCountries.list.indexOf(data[i].user.country) != -1 ) return;
//                              $scope.filterParams.byCountries.list.push(data[i].user.country);
//                              };
//                            });
                   $scope.filteredList = filterService.list('apytanki', $location.search());
                   for ( var i = 0; i < $scope.filteredList.length; i++ ) {
                       if( $scope.filterParams.byCountries.list.indexOf($scope.filteredList[i].user.country) != -1 ) return;
                       $scope.filterParams.byCountries.list.push($scope.filteredList[i].user.country);
                   };
               }, true);

           }],
           link: function($scope, iElement, iAttrs, ctrl){

               $scope.$watch('filterParams', function(newVal, oldVal){
                   if ( newVal != oldVal ) $scope.updateLocation(newVal);
               }, true);


           },
           transclude: true
       }

   }]);

})();
