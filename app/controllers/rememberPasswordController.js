/**
 * Created by gabrieldyck on 29/01/17.
 */
app.controller("rememberPasswordController", ["$scope", "petPlanetServices", "$location", function ($scope, petPlanetServices, $location) {

    $scope.request = {};

    $scope.recoverPassword = function () {

        petPlanetServices.recoverPassword($scope.request).success(function () {
            $location.path("/recuperar-password-informada");
        }).error(function (response) {
            console.log(response);
        });
    }
}]);
