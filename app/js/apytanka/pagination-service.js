/**
 * Created by юля on 06.01.2015.
 */
(function(){
    var customServices = angular.module('customFilter');

    customServices.factory('Pagination', [function(){

        function Pagination(arr){

            var _itemsNumber = 5;
            var _numberToShow = 5;
            var _pagesList = _pagesNumber >= 5 ? [0,1,2,3,4] : [0,1,2,3,4].slice(0, _pagesNumber);
            var _pagesNumber = 0;
            var _allData = [];
            var _pageIndex = 0;

            function _createPagesList(){
                for ( var i = 0; i < _numberToShow; i++ ) {
                    _pagesList[i] += 5;
                    if ( _pagesList[i] == _pagesNumber ) return;
                }
            };

            function _setPagination (data) {
                _allData = data;
                _pagesNumber = Math.ceil( _allData.length / _itemsNumber );
                _createPagesList();
            };

            function _currentPage (index) {
                _pageIndex = index;
                if ( _pageIndex > _pagesNumber ) return;
                var startIndex = _pageIndex*_itemsNumber - _itemsNumber;
                var endIndex = _pageIndex*_itemsNumber;
                return _pageIndex == null ? _allData : _allData.slice(startIndex, endIndex);
            };

            this.createPagesList = _createPagesList;

            this.pagesNumber = _pagesNumber;

            this.pageIndex = _pageIndex;

            this.pagesList = _pagesList;

            this.currentPage = _currentPage;

            this.setData = _setPagination;

            this.setData(arr);

        };

        return Pagination;

//        var itemsNumber = 5;
//        var numberToShow = 5;
//        var pagesList = pagesNumber >= 5 ? [0,1,2,3,4] : [0,1,2,3,4].slice(0, pagesNumber);
//        var pagesNumber = 0;
//        var allData = [];
//        var pageIndex = 0;
//
//        function createPagesList(){
//            for ( var i = 0; i < numberToShow; i++ ) {
//                pagesList[i] += 5;
//                if ( pagesList[i] == pagesNumber ) return;
//            }
//        };
//
//        function setPagination (arr) {
//            allData = arr;
//            pagesNumber = Math.ceil( allData.length / itemsNumber );
//            createPagesList();
//        };
//
//        function currentPage (index) {
//            pageIndex = index;
//            if (pageIndex > pagesNumber) return;
//            var startIndex = pageIndex*itemsNumber - itemsNumber;
//            var endIndex = pageIndex*itemsNumber;
//            return pageIndex == null ? allData : allData.slice(startIndex, endIndex);
//        };
//
//        return {
//            setData: function(arr){
//                setPagination(arr);
//            },
//            currentPage: currentPage,
//            pagesNumber: pagesNumber,
//            pageIndex: pageIndex,
//            createPagesList: createPagesList
//        }
    }]);

})();
