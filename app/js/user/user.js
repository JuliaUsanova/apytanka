/**
 * Created by юля on 20.11.2014.
 */

(function(){

    var userMod = angular.module('user', ['customDirectives', 'userControllers']);

    userMod.service('User', [function(){

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
    }]);


})();