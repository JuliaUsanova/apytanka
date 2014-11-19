/**
 * Created by юля on 17.11.2014.
 */
(function(){

    var app = angular.module('statistics', ['components']);

    app.controller('resultsCtrl',['$scope', function($scope) {
        $scope.results = [
            {option: "yes", votes: 16},
            {option: 'no', votes: 14},
            {option: "i don't know", votes: 15},
            {option: "other", votes: 1}
        ];
        $scope.maxResultsLength = 11;
        $scope.resultsCount = function () {
            var count = 0;
            var i = 0;
            for (i; i < $scope.results.length; i++) {
                if (!isNaN($scope.results[i].votes)) count += +$scope.results[i].votes;
            }
            return count;
        };

        for(var i = 0; i < $scope.results.length; i++){
            $scope.results[i].degrees = function(){
                return (+this.votes * 360 / $scope.resultsCount()).toFixed(0) ;
            };

            $scope.results[i].percent = function(){
                return (+this.votes * 100 / $scope.resultsCount()).toFixed(2) ;
            };
        }


        $scope.addNewResult = function(){
            $scope.results.push({option: '', votes: ''});
        };
    }]);

})();
