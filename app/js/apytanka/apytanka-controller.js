/**
 * Created by юля on 28.12.2014.
 */
(function(){
    var apytanka = angular.module('apytanka');

//    apytanka.controller('apytankaListCtrl', ['$scope', '$location', 'filterService', function($scope, $location, filterService){
//
//        $scope.filterParams = {
//            byCountries: {
//                list: [{id: 'all', name: 'Усе'}],
//                selected: 'all'
//            },
//            search: '',
//            byDate: {
//                options: [{value: 0, name: 'Спачатку новыя'}, {value: 1, name: 'Спачатку старыя'}, {value: 'all', name: 'Не мае сэнса'}],
//                selected: 'all'
//            },
//            byRating: {
//                options: [{value: 0, name: 'Спачатку з вышэйшым'}, {value: 1, name: 'Спачатку з ніжэйшым'}, {value: 'all', name: 'Не мае сэнса'}],
//                selected: 'all'
//            }
//        };
//
//        $scope.$watch($location, function(newVal, oldVal){
////                filterService.list('apytanki', $location.search()).success(function(data){
////                                $scope.filteredList = data;
////                              for ( var i = 0; i < data.length; i++ ) {
////                              if( $scope.filterParams.byCountries.list.indexOf(data[i].user.country) != -1 ) return;
////                              $scope.filterParams.byCountries.list.push(data[i].user.country);
////                              };
////                            });
//            $scope.filteredList = filterService.list('apytanki', $location.search());
//            for ( var i = 0; i < $scope.filteredList.length; i++ ) {
//                if( $scope.filterParams.byCountries.list.indexOf($scope.filteredList[i].user.country) != -1 ) return;
//                $scope.filterParams.byCountries.list.push($scope.filteredList[i].user.country);
//            };
//        }, true);
//
//
//
//
//
////        $scope.getData = function(){
////            var params;
////            var requestMethod;
////
////            var parseUrl = function(url){
////                requestMethod = $location.path();
////                params = $location.search();
////            };
////            return function($routeParams){
////                parseUrl(url);
//////                            return $http({
//////                                method: requestMethod,
//////                                url: 'https:...' + params
//////                            }).success(function(data){
//////                                $scope.filteredList = data;
//////                              for ( var i = 0; i < data.length; i++ ) {
//////                              if( $scope.filters.byCountries.list.indexOf(data[i].user.country) != -1 ) return;
//////                              $scope.filters.byCountries.list.push(data[i].user.country);
//////                              };
//////                            });
////
////                $scope.filteredList = [
////                    {id: '1', user: {name: 'Ivan', surname: 'Ivanov', id: 123, avatar: 'css/images/563469251.png', country: {id: 2, name: 'Thailand'}, city: 'Bangkok'}, title: "First", content: 'bla-bla-bla',
////                        date: 634600801000, rating: {likes: [2, 12, 125, 45, 85, 44], dislikes: [14,58,21]}},
////                    {id: '2', user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: 'css/images/563469251.png', country: {id: 1, name: 'Italy'}, city: 'Rome'}, title: "AHAHAHAH",
////                        content: 'Fortune, which has a great deal of power in other matters but especially in war, can bring about great changes in a situation through very slight forces',
////                        date: 634600801001, rating: {likes: [14, 12, 115, 15, 84, 42,64], dislikes: [18,88,26,53]}},
////                    {id: '3', user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: 'css/images/563469251.png', country: {id: 3, name: 'Germany'}, city: 'Berlin'}, title: "fsdadfg",
////                        content: 'What we wish, we readily believe, and what we ourselves think, we imagine others think also',
////                        date: 634600801401, rating: {likes: [1, 12, 10, 13, 8], dislikes: [18]}}
////                ];
////            };
////
////        };
////
////        $scope.getData();
//
//    }]);

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