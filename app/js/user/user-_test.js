/**
 * Created with JetBrains WebStorm.
 * User: julia
 * Date: 03.12.14
 * Time: 12:50
 * To change this template use File | Settings | File Templates.
 */
describe("A User", function() {
    var userData = {
        id: 1, name: 'User', surname: 'Userov', email: 'user@gmail.com', avatar: '../css/images/563469251.png', gender: 'f',
        dateOfBirth: 634600800000, country: 'Belarus', city: 'Minsk', street: 'Russianova',
        skills: [
            {university: 0, speciality: 1, job: 4, experience: 0},
            {university: 3, speciality: 2, job: 0, experience: 2}
        ],
        interests: [{value: 0, descr: 'tra ta ta'},{value: 1, descr: 'like to listen the music'},{value: 4, descr: 'do sport every day'},{value: 5, descr: ''}]
    };

    var enteredUserData = {email: 'myemail@gmail.com', psw: '111', name: 'Kitty', surname: 'Lenob'};

    beforeEach(inject(function($rootScope, $service) {
        scope = $rootScope.$new();
        service = $service(userService, {$scope: scope});
    }));

    it("should login the user", function() {
        service.loginUser(enteredUserData);
        expect(service.user.id).toEqual(1);
    });

    it("should register the user", function() {
        service.registerUser(enteredUserData);
        expect(service.user.id).toEqual(1);
    });
});