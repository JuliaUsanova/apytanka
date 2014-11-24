/**
 * Created by юля on 20.11.2014.
 */
(function(){

    var userMod = angular.module('user', ['customDirectives']);

    userMod.controller('profileCtrl', ['$scope', function($scope){
        var User;
        var userData = {
            id: 1, name: 'User', surname: 'Userov', email: 'user@gmail.com', avatar: '../css/images/563469251.png', gender: 'f',
            dateOfBirth: 634600800000, country: 'Belarus', city: 'Minsk', street: 'Russianova',
            skills: [
                {university: 0, speciality: 1, job: 4, experience: 0},
                {university: 3, speciality: 2, job: 0, experience: 2}
            ],
            interests: [{value: 0, descr: 'tra ta ta'},{value: 1, descr: 'like to listen the music'},{value: 4, descr: 'do sport every day'},{value: 5, descr: ''}]
        };

        User = (function(){
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
        })();


        $scope.selectFile = function(){
            jQuery('#fileselect').click();
        };

        $scope.setAvatar = function(params){
                    var event = params.event;

                    var ParseFile = function (file){
                        // display an image
                        if (file.type.indexOf("image") == 0) {
                            var reader = new FileReader();

                            reader.readAsDataURL(file);

                            reader.onload = function(e) {
                                $scope.user.avatar = (e.target.result);
                            };


                        }
                    };

                    if (window.File && window.FileList && window.FileReader && event && event.target.files.length > 0) {

                        var file = event.target.files[event.target.files.length-1] || event.dataTransfer.files[event.dataTransfer.files.length-1];

                        // process File object


                        ParseFile(file);


                    }

        };

        $scope.profData = {
            universities: [
                {value: 0, name: 'БГЭУ'}, {value: 1, name: 'БГУ'}, {value: 2, name: 'БГУИР'},
                {value: 3, name: 'ЕГУ'}, {value: 4, name: 'ГПТУ'}, {value: 5, name: 'коледж'}, {value: 6, name: 'іншае'}],
            specialities: [
            {value: 0, name: 'эканаміст'}, {value: 1, name: 'праграміст'},{value: 2, name: 'лекар'}, {value: 3, name: 'ІП'},
            {value: 4, name: 'не працую'}, {value: 5, name: 'іншае'}],
            jobs: [{value: 0, name: 'Эканаміст'}, {value: 1, name: 'Юрыст'}, {value: 2, name: 'Праграміст'}, {value: 3, name: 'Будаўнік'},
                {value: 4, name: 'Лекар'}, {value: 5, name: 'Не працую'}],
            experience: [{value: 0, name: '< 1 года'},{value: 1, name: '> 1 года'},{value: 2, name: 'няма вопыту'}]
        };

        $scope.interestsData = [{value: 0, name: "Раслінавоцтва"}, {value: 1, name: "Музыка"}, {value: 2, name: "Танцы"}, {value: 3, name: "Маляванне"},
            {value: 4, name: "Спорт"}, {value: 5, name: "Вегетарыянства"}, {value: 6, name: "Развядзенне жывел"}, {value: 7, name: "Кансалтынг"},
            {value: 8, name: "Турызм"}, {value: 9, name: "Дызайн"}];


        $scope.user = new User(userData);




    }]);


})();