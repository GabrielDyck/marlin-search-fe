/**
 * Created by gabrieldyck on 05/05/17.
 */
app.controller("profileController", ["$scope","$location","petPlanetServices", function($scope,$location,petPlanetServices) {

    var absoluteUrl= $location.absUrl().split('/');

    var username=absoluteUrl[absoluteUrl.length-1];

    console.log(username);



}]);