/**
 * Created by юля on 06.01.2015.
 */
(function(){
    var customServices = angular.module('customFilter');

    customServices.factory('pagination', [function(){
        var itemsNumber = 5;
        var numberToShow = 5;
        var pagesList = pagesNumber >= 5 ? [0,1,2,3,4] : [0,1,2,3,4].slice(0, pagesNumber);
        var pagesNumber = 0;
        var allData = [];
        var pageIndex = 0;

        function createPagesList(){
            for ( var i = 0; i < numberToShow; i++ ) {
                pagesList[i] += 5;
                if ( pagesList[i] == pagesNumber ) return;
            }
        };

        function setPagination (arr) {
            allData = arr;
            pagesNumber = Math.ceil( allData.length / itemsNumber );
            createPagesList();
        };

        function currentPage (index) {
            pageIndex = index;
            if (pageIndex > pagesNumber) return;
            var startIndex = pageIndex*itemsNumber - itemsNumber;
            var endIndex = pageIndex*itemsNumber;
            return pageIndex == null ? allData : allData.slice(startIndex, endIndex);
        };

        return {
            setData: function(arr){
                setPagination(arr);
            },
            currentPage: currentPage,
            pagesNumber: pagesNumber,
            pageIndex: pageIndex,
            createPagesList: createPagesList
        }
    }]);

})();
