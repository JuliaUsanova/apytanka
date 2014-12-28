/**
 * Created by юля on 26.11.2014.
 */

(function(){

    var apytanka = angular.module('apytanka', ['user']);

    apytanka.factory('Apytanka', ['userService', function(userService){

        var user = userService.getUser();

        var Apytanka = (function(data){
            function ApytankaClass (data){
                this.id = data.id;
                this.user = data.user || {id: '', name: '', surname: '', avatar: '', country: '', city: ''};
                this.title = data.title || '';
                this.content = data.content || '';
                this.date = new Date(data.date);
                this.rating = data.rating || {likes: [], dislikes: []};
                this.comments = data.comments;
            }
            ApytankaClass.prototype.like = function(){
                var index = this.rating.likes.indexOf(user.id);
                index == -1 ? this.rating.likes.push(user.id) : this.rating.likes.splice(index, 1);
            };
            ApytankaClass.prototype.dislike = function(){
                var index = this.rating.dislikes.indexOf(user.id);
                index == -1 ? this.rating.dislikes.push(user.id) : this.rating.dislikes.splice(index, 1);
            };

            return ApytankaClass;

        })();

        return Apytanka;


    }]);

    apytanka.controller('apytankaListCtrl', ['$scope', 'Apytanka', function($scope, Apytanka){


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

    apytanka.controller('apytankaCtrl', ['$scope', 'Apytanka', 'userService', function($scope, Apytanka, userService){

        var user = userService.getUser();

        var apytanka = {id: '1', user: {name: 'Inna', surname: 'Ivanova', id: 123, avatar: 'css/images/1644835.jpg', country: 'Thailand',
            city: 'Bangkok'}, title: "First", content: 'bla-bla-bl-nnnnnnnnnnnnnnn-knbvccvg ghjb c gcvbnb fhggfc dddfg ga', date: 634600801000,
        comments: [
            {user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: 'css/images/563469251.png', country: 'Germany', city: 'Berlin'}, id: 1,
                comment: {content: 'fffffff', title: 'Yjdfkdre fesadfjfds fvgnbvcxzx', rating: 3, date: '30.08.2014'}},
            {user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: 'css/images/563469251.png', country: 'Italy', city: 'Rome'}, id: 2,
                comment: {content: 'fjsddfudisd hfduioskzxmc sodklxmcnvb sbddfskx bdszkxc fds', title: 'Ijdnfjd fhuew', date: '12.05.2014', rating: 4}}
        ]};

        $scope.apytanka = new Apytanka(apytanka);

        var pureComment = {
            content: '',
            title: '',
            date: new Date(),
            rating: 0,
            setRating: function(val){
                rating = val+1;
            }
        };

        $scope.uComment = pureComment;

        $scope.addComment = function(){
            var comment =  {user: {name: user.name, surname: user.surname, id: user.id, avatar: user.avatar, country: user.country, city: user.city},
                id: 'new', comment: {content: $scope.uComment.content, title: $scope.uComment.title, date: $scope.uComment.date,
                    rating: $scope.uComment.rating}};
            $scope.apytanka.comments.push(comment);
            $scope.uComment = pureComment;
        };

    }]);



})();