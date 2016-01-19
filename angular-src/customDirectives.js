/**
 * Created by tomi on 19/01/16.
 */
angular.module('app')
    .directive('staticInclude', ['$http', '$templateCache', '$compile', function ($http, $templateCache, $compile) {
            return function(scope, element, attrs) {
                var templatePath = attrs.staticInclude;
                $http.get(templatePath, { cache: $templateCache }).success(function(response) {
                    var contents = element.html(response).contents();
                    $compile(contents)(scope);
                });
            };
    }])
    //.directive('staticInclude', function($http, $templateCache, $compile) {
    //    return function(scope, element, attrs) {
    //        var templatePath = attrs.staticInclude;
    //        $http.get(templatePath, { cache: $templateCache }).success(function(response) {
    //            var contents = element.html(response).contents();
    //            $compile(contents)(scope);
    //        });
    //    };
    //});