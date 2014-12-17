/**
 * Created by юля on 17.11.2014.
 */
(function(){
    var app = angular.module('myApp', ['user', 'ngRoute', 'apytanka']);

    app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider.
                when('/', {
                    templateUrl: './partials/main.html'
                }).
                when('/profile/:id', {
                    templateUrl: './partials/profile.html'
                }).
                when('/user-profile', {
                    redirectTo: '/user-profile/about'
                }).
                when('/user-profile/about', {
                    templateUrl: './partials/profile-edit.html',
                    action: 'profile.about',
                    controller: 'profileCtrl'
                }).
                when('/user-profile/apytanki', {
                    templateUrl: './partials/profile-edit.html',
                    action: 'profile.apytanki',
                    controller: 'apytankaCtrl'
                }).
                when('/user-profile/settings', {
                    templateUrl: './partials/profile-edit.html',
                    action: 'profile.settings'
                }).
                otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode({
                enabled: true
            });

        }]);

    app.controller('editProfileRouteCtrl', ['$scope', '$route', '$routeParams', function($scope, $route, $routeParams){
            var render = function(){

                // Pull the "action" value out of the
                // currently selected route.
                var renderAction = $route.current.action;

                // Also, let's update the render path so that
                // we can start conditionally rendering parts
                // of the page.
                if(renderAction){
                    var renderPath = renderAction.split( "." );

                    // Grab the username out of the params.
                    //
                    // NOTE: This will be undefined for every route
                    // except for the "contact" route; for the sake
                    // of simplicity, I am not exerting any finer
                    // logic around it.
//                var username = ($routeParams.username || "");

                    // Reset the booleans used to set the class
                    // for the navigation.
                    var about = (renderPath[ 1 ] == "about");
                    var apytanki = (renderPath[ 1 ] == "apytanki");
                    var settings = (renderPath[ 1 ] == "settings");

                    // Store the values in the model.
                    $scope.renderAction = renderAction;
                    $scope.renderPath = renderPath;
                    $scope.currentOn = {'about': about, 'apytanki': apytanki, 'settings': settings};

                    console.log(renderPath[ 1 ]);
                }

            };

            // Listen for changes to the Route. When the route
            // changes, let's set the renderAction model value so
            // that it can render in the Strong element.
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

        $scope.user = userService.getUser();

    }]);


})();