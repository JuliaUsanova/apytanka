/**
 * Created by юля on 17.11.2014.
 */
(function(){

    var components = angular.module('components', []);

    components.directive('pie', function(){
        return {
            restrict: 'E',
            controller: function($scope, $element){
                var scope = $scope;

                scope.setCorrectRotation = function rotationSetter (element, pie) {
                    var index = $scope.results.indexOf(scope.pie);
                    var holdDegree = 0;
                    for ( var i = 0; i < index; i++ ) {
                        holdDegree += (+$scope.results[i].degrees());
                    }
                    transform( $element.children('.hold'), holdDegree );
                    transform( $element.children('.hold').children('.pie'), scope.pie.degrees() );
                };

                function transform(el, degree){
                    var flag = false;
                    if ( el.attr('class') && el.attr('class').split(' ').indexOf('pie') != -1 && degree > 180 ) {
                        degree = degree - 180;
                        flag = true;
                    }
                    degree = degree + 'deg';
                    el.css('-webkit-transform', 'rotate(' + degree + ')');
                    el.css('-moz-transform', 'rotate(' + degree + ')');
                    el.css('-ms-transform', 'rotate(' + degree + ')');
                    el.css('transform', 'rotate(' + degree + ')');
                    if ( flag ) {
                        flag = false;
                        showSiblingPie(el, degree);
                    }
                }

                function showSiblingPie(el, degree){
                    var newEl = el.parent().next('#additional-pie');
                    var newElDegree = +newEl.css('transform').replace(/\D/g, '') + (+degree.replace(/\D/g, ''));
                    var newElChild = newEl.children('.pie');

                    transform(newEl, newElDegree);
                    transform(newElChild, 180);
                };

                $scope.$watch('resultsCount()', function(newVal, oldVal){
                    scope.setCorrectRotation();
                }, true);

            },
            template: '<div class="hold">'+
                '<p class="pie option-{{$index+1}}">' +
                '</p>' +
                '</div>' +
                '<div class="hold" id="additional-pie" ng-show="pie.degrees() > 180">'+
                '<p class="pie option-{{$index+1}}">' +
                '</p>' +
                '</div>'
        };
    });

    components.directive('graph', function(){
        return {
            restrict: "A",
            template: '<table class="table">' +
                '<tr ng-repeat="graph in results">' +
                '<td class="col-sm-4">{{graph.option}} ({{graph.percent()}}%)</td>' +
                '<td class="col-sm-8"><p class="option-{{$index+1}}" style="width: {{graph.percent()}}%"></p></td>' +
                '</tr>' +
                '</table>'
        };
    });

})();