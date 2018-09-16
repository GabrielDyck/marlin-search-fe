/**
 * Created by gabrieldyck on 22/01/17.
 */

app.controller("signinController",["$scope","petPlanetServices","$location",function ($scope,petPlanetServices,$location){

    var init= function () {
        $scope.validEmail=null;
        $scope.validUser=null;
        $scope.signRequest= {};
        $scope.confirmedPassword=null;
        $scope.recaptcha=false;
    };

    $scope.validatePassword= function() {
        console.log($scope.signRequest.password == $scope.confirmedPassword);
        $scope.passwordMatches=$scope.signRequest.password === $scope.confirmedPassword;
        return $scope.passwordMatches;

    };


    $scope.sendSignInRequest= function(){
        $scope.recaptcha = grecaptcha.getResponse().length!=0;

        if($scope.passwordMatches && $scope.validEmail && $scope.validUser && $scope.recaptcha && checkRequiredFields()){
            $('#pleaseWaitDialog').removeClass('hide');

            var signRequest= angular.copy($scope.signRequest);
            signRequest.password=CryptoJS.SHA256($scope.signRequest.password).toString();
            petPlanetServices.signIn(signRequest).success(function(response){
                $('#pleaseWaitDialog').addClass('hide');
                console.log(response);
                $location.path("/cuenta-creada");
            });
        }else{
            $.notify("Los campos marcados con ( * ) son requeridos.", "error");

        }

    };

    $scope.validateEmail= function() {
        var request = {"mail": $scope.signRequest.mail};
        petPlanetServices.checkExistingMail(request).success(function (response) {
            console.log(response);
            $scope.validEmail=response;
        });
    };

    $scope.validateUser= function() {
        var request = {"user": $scope.signRequest.username};
        petPlanetServices.checkExistingUser(request).success(function (response) {
            console.log(response);
            $scope.validUser=response;
        });
    };


    var checkRequiredFields= function(){
        return $scope.signRequest.fullname!=null &&
            $scope.signRequest.username!=null &&
            $scope.signRequest.mail !=null &&
            $scope.signRequest.password.length >= 8;
    };

    init();
}]);
