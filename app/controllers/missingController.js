/**
 * Created by gabrieldyck on 15/01/17.
 */
app.controller("missingController", ["$scope", "$controller", function ($scope,$controller ) {
    $controller('searchController', {$scope: $scope});
    $scope.title = "Perdidos";
    $scope.request.publicationType="PERDIDO";

}]);