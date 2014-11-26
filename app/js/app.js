/**
 * Created by юля on 17.11.2014.
 */
(function(){
    var app = angular.module('myApp', ['user', 'ngRoute']);

    app.controller('appCtrl', ['$scope', function($scope){
        $scope.template = {
            header: '../app/partials/header.html',
            footer: '../app/partials/footer.html',
            main: '../app/partials/main.html'
        };
    }]);

})();