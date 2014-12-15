/**
 * Created by юля on 14.11.2014.
 */
exports.config = {
    framework: 'jasmine',
//    directConnect: true,
    capabilities: {
        browserName: 'firefox'
    },
    chromeDriver: 'C:/Users/юля/AppData/Roaming/npm/node_modules/protractor/selenium/chromedriver',
//    chromeDriver: 'C:/Users/julia/AppData/Roaming/npm/node_modules/protractor/selenium/chromedriver',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/e2e/*.js'],
    baseUrl: 'http://test.apytanka.by/app'

};