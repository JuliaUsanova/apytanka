/**
 * Created by юля on 20.11.2014.
 */

(function(){

    var userMod = angular.module('user', ['customDirectives', 'userControllers']);

    userMod.service('userService', ['$http', function($http){

        var User = (function(){

            function UserClass ( data ) {
                this.id = data.id;
                this.name = data.name;
                this.surname = data.surname;
                this.email = data.email;
                this.gender = data.gender;
                this.dateOfBirth = new Date(data.dateOfBirth);
                this.country = data.country;
                this.city = data.city;
                this.street = data.street;
                this.skills = data.skills || [{value: '', name: ''}];
                this.interests = data.interests || [{value: '', descr: ''}];
                this.avatar = (data.avatar);
                this.registered = true;
            }

            UserClass.prototype.addNewSkill = function(){
                this.skills.push({});
            };

            UserClass.prototype.addNewInterest = function(){
                this.interests.push({});
            };

            UserClass.prototype.removeSkill = function(skill){
                var index = this.skills.indexOf(skill);
                this.skills.splice(index, 1);
            };

            UserClass.prototype.removeInterest = function(interest){
                var index = this.interests.indexOf(interest);
                this.interests.splice(index, 1);
            };

            return UserClass;

        })();
        var self = this;


        function setUser (url, method, data){

            var userData = {
                id: 1, name: 'User', surname: 'Userov', email: 'user@gmail.com', avatar: '../css/images/563469251.png', gender: 'f',
                dateOfBirth: 634600800000, country: 'Belarus', city: 'Minsk', street: 'Russianova',
                skills: [
                    {university: 0, speciality: 1, job: 4, experience: 0},
                    {university: 3, speciality: 2, job: 0, experience: 2}
                ],
                interests: [{value: 0, descr: 'tra ta ta'},{value: 1, descr: 'like to listen the music'},{value: 4, descr: 'do sport every day'},{value: 5, descr: ''}]
            };

//            $http.get(url, {method: data}).success(function(){
                self.user = new User(userData);
                return true;
//            });

        };

        this.loginUser = function(data){
            setUser('login', 'loginUser', data);
        };

        this.registerUser = function(data){
            setUser('register', 'registerUser', data);
        };

    }]);


})();