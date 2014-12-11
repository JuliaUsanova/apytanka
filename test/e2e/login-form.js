/**
 * Created with JetBrains WebStorm.
 * User: julia
 * Date: 10.12.14
 * Time: 13:46
 * To change this template use File | Settings | File Templates.
 */
describe('login and register form', function(){


    beforeEach(function() {
        browser.get('/login-form');
        var name = element(by.id('user-name'));
        name.sendKeys('Julia');
    });

    it('should send the form and set user', function(){
//        expect(name.getText()).toBeNull();
        expect(name.getText()).toEqual('Julia');
    });
});