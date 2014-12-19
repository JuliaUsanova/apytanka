/**
 * Created by юля on 26.11.2014.
 */

(function(){

    var apytanka = angular.module('apytanka', ['user']);

    apytanka.service('Apytanka', ['userService', function(userService){

        var user = userService.getUser();

        function Apytanka (data){
            this.id = data.id;
            this.user = data.user || {id: '', name: '', surname: '', avatar: '', country: '', city: ''};
            this.title = data.title || '';
            this.content = data.content || '';
            this.date = new Date(data.date);
            this.rating = data.rating;
//            this.likes = data.likes || [];
//            this.dislikes = data.dislikes || [];

        }
        Apytanka.prototype.like = function(){
            console.log(user.id);
        };
        Apytanka.prototype.dislike = function(){
            console.log(user.id);
        };

        return Apytanka;

    }]);

    apytanka.controller('apytankaCtrl', ['$scope', '$http', 'Apytanka', function($scope, $http, Apytanka){

        $scope.apytankaList = [];

        var apytankaList = [
                {id: '1', user: {name: 'Ivan', surname: 'Ivanov', id: 123, avatar: 'css/images/563469251.png', country: 'Thailand', city: 'Bangkok'}, title: "First", content: 'bla-bla-bla',
                date: 634600801000, rating: {likes: [2, 12, 125, 45, 85, 44], dislikes: [14,58,21]}},
                {id: '2', user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: 'css/images/563469251.png', country: 'Italy', city: 'Rome'}, title: "AHAHAHAH",
                    content: 'Fortune, which has a great deal of power in other matters but especially in war, can bring about great changes in a situation through very slight forces',
                        date: 634600801001, rating: {likes: [14, 12, 115, 15, 84, 42,64], dislikes: [18,88,26,53]}},
                {id: '3', user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: 'css/images/563469251.png', country: 'Germany', city: 'Berlin'}, title: "fsdadfg",
                    content: 'What we wish, we readily believe, and what we ourselves think, we imagine others think also',
                    date: 634600801401, rating: {likes: [1, 12, 10, 13, 8], dislikes: [18]}}
            ];

        angular.forEach(apytankaList, function(obj) {
            this.push(new Apytanka(obj));
        }, $scope.apytankaList);



    }]);

})();