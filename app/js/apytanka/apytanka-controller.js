/**
 * Created by юля on 28.12.2014.
 */
(function(){
    var apytanka = angular.module('apytanka');

    apytanka.controller('apytankaListCtrl', ['$scope', 'ApytankaFactory', '$location', function($scope, ApytankaFactory, $location){



    }]);

    apytanka.controller('apytankaCtrl', ['$scope', 'ApytankaFactory', 'userService', function($scope, ApytankaFactory, userService){

        var user = userService.getUser();

        var apytanka = {id: '1', user: {name: 'Inna', surname: 'Ivanova', id: 123, avatar: 'css/images/1644835.jpg', country: 'Thailand',
            city: 'Bangkok'}, title: "First", content: 'bla-bla-bl-nnnnnnnnnnnnnnn-knbvccvg ghjb c gcvbnb fhggfc dddfg ga', date: 634600801000,
            comments: [
                {user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: 'css/images/563469251.png', country: 'Germany', city: 'Berlin'}, id: 1,
                    comment: {content: 'fffffff', title: 'Yjdfkdre fesadfjfds fvgnbvcxzx', rating: 3, date: '30.08.2014'}},
                {user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: 'css/images/563469251.png', country: 'Italy', city: 'Rome'}, id: 2,
                    comment: {content: 'fjsddfudisd hfduioskzxmc sodklxmcnvb sbddfskx bdszkxc fds', title: 'Ijdnfjd fhuew', date: '12.05.2014', rating: 4}}
            ]};

        $scope.apytanka = new ApytankaFactory(apytanka);

        var pureComment = {
            content: '',
            title: '',
            date: new Date(),
            rating: (function(){
                var number = 0;

                function rating (){
                    return number
                };

                rating.setR = function(val){
                    if(typeof(val) == 'number' && val <= 5) number = val;
                    rating();
                };

                rating.isPositive = function(val){
                    return number - val >= 0;
                };

                return rating;

            })()
        };

        $scope.uComment = angular.copy(pureComment);

        $scope.addComment = function(){
            var comment =  {user: {name: user.name, surname: user.surname, id: user.id, avatar: user.avatar, country: user.country, city: user.city},
                id: 'new', comment: {content: $scope.uComment.content, title: $scope.uComment.title, date: $scope.uComment.date,
                    rating: $scope.uComment.rating()}};

//            http request should be here, with user id expept user: {}
//            in the respond the id of new comment will come


            $scope.apytanka.comments.unshift(comment);
            pureComment.rating.setR(0);
            $scope.uComment = angular.copy(pureComment);
        };

    }]);
})();