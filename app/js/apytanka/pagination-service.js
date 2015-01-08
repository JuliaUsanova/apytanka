/**
 * Created by юля on 06.01.2015.
 */
(function(){
    var customServices = angular.module('customFilter');

    customServices.factory('pagination', [function(){
        var itemsNumber = 5;
        var pagesNumber = 0;
        var allData = [];

        function setPagination (arr) {
            allData = arr;
            pagesNumber = Math.ceil( allData.length / itemsNumber );
        }

        function currentPage (number) {
            if (number > pagesNumber) return;
            var startIndex = number*itemsNumber - itemsNumber;
            var endIndex = number*itemsNumber;
            return number == null ? allData : allData.slice(startIndex, endIndex);
        };

        return {
            setData: function(arr){
                setPagination(arr);
            },
            currentPage: currentPage,
            pagesNumber: pagesNumber
        }
    }]);

})();
