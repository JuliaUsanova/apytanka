/**
 * Created by юля on 17.11.2014.
 */
(function(){
    var app = angular.module('myApp', ['user', 'ngRoute', 'apytanka', 'customDirectives']);

    app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider.
                when('/', {
                    templateUrl: './partials/main.html'
                }).
                when('/profile/:id', {
                    templateUrl: './partials/profile.html',
                    controller: 'chosenUserProfile'
                }).
                when('/profile/:id/edit', {
                    redirectTo: '/profile/:id/edit/about'
                }).
                when('/profile/:id/edit/about', {
                    templateUrl: './partials/profile-edit.html',
                    action: 'profile.about',
                    controller: 'profileCtrl'
                }).
                when('/profile/:id/edit/apytanki?:params', {
                    templateUrl: './partials/profile-edit.html',
                    action: 'profile.apytanki',
                    reloadOnSearch: false
                }).
                when('/profile/:id/edit/settings', {
                    templateUrl: './partials/profile-edit.html',
                    action: 'profile.settings'
                }).
                when('/apytanka/:id', {
                    templateUrl: './partials/apytanka-discussion.html',
                    controller: 'apytankaCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode({
                enabled: true
            });
            $locationProvider.hashPrefix('');

        }]);

    app.controller('editProfileRouteCtrl', ['$scope', '$route', '$routeParams', function($scope, $route, $routeParams){
            var render = function(){

                var renderAction = $route.current.action;

                if(renderAction){
                    var renderPath = renderAction.split( "." );
                    var about = (renderPath[ 1 ] == "about");
                    var apytanki = (renderPath[ 1 ] == "apytanki");
                    var settings = (renderPath[ 1 ] == "settings");

                    // Store the values in the model.
                    $scope.renderAction = renderAction;
                    $scope.renderPath = renderPath;
                    $scope.currentOn = {'about': about, 'apytanki': apytanki, 'settings': settings};
                }

            };

            $scope.$on("$routeChangeSuccess", function( $currentRoute, $previousRoute ){

                    // Update the rendering.
                    render();

            });

    }]);

    app.controller('appCtrl', ['$scope', '$timeout','userService', function($scope, $timeout, userService){

        $scope.template = {
            header: 'partials/header.html',
            footer: 'partials/footer.html',
            login: 'partials/login-form.html'
        };

        $scope.currentUser = userService.getUser();

    }]);


})();