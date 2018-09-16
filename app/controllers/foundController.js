app.controller("foundController", ["$scope", "$controller", function ($scope, $controller) {
    $controller('searchController', {$scope: $scope});
    $scope.title = "Encontrados";
    $scope.request.publicationType = "ENCONTRADO";


}]);