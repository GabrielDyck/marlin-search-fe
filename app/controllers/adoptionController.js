/**
 * Created by gabrieldyck on 22/01/17.
 */
app.controller("adoptionController", ["$scope","$controller", function($scope,$controller) {
    $controller('searchController', {$scope: $scope});

    $scope.title="Adopciones";
    $scope.request.publicationType = "ADOPCION";

}]);
