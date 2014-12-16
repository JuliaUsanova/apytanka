/**
 * Created by юля on 26.11.2014.
 */

(function(){

    var userControllers = angular.module('userControllers', ['user']);

    userControllers.controller('loginCtrl', ['$scope', 'userService', '$element', function($scope, userService, $element){

        $scope.registered = userService.isRegistered();

        $scope.userData = {email: '', psw: '', name: '', surname: ''};

        $scope.logIn = function(){

            var result = userService.loginUser($scope.userData);

            if($element.hasClass('modal') && result) jQuery('#' + $element.attr('id')).modal('hide');

        };

        $scope.register = function(){

            var result = userService.registerUser($scope.userData);

            if($element.hasClass('modal') && result) jQuery('#' + $element.attr('id')).modal('hide');

        };

    }]);


    userControllers.controller('profileCtrl', ['$scope', 'userService', function($scope, userService){

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
                        userService.changeAvatar(e.target.result);
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

    }]);

})();
