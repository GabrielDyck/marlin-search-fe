/**
 * Created by gabrieldyck on 28/05/17.
 */

app.controller("hometransitDetailController", ["$scope", "petPlanetServices", "$location", "userService", function ($scope, petPlanetServices, $location, userService) {

    var absoluteUrl = $location.absUrl().split('/');

    var transitId = absoluteUrl[absoluteUrl.length - 1];



    var getSearchDetail = function () {
        var request = {id: transitId};

        petPlanetServices.searchTransitsDetail(request).success(function (response) {
            console.log(response);
            $scope.publication = response;

            window.publication= response;

        });
    };





    getSearchDetail();
}]);