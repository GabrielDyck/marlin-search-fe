/**
 * Created by gabrieldyck on 22/01/17.
 */

app.controller("loginController", ["$scope","petPlanetServices","$location", function($scope,petPlanetServices,$location) {

    $scope.loginError;
    var init= function () {
        $scope.loginRequest= {};
    };

    $scope.sendLoginRequest= function(){

        var loginRequest= angular.copy($scope.loginRequest);
        loginRequest.password=CryptoJS.SHA256($scope.loginRequest.password).toString();
        petPlanetServices.login(loginRequest).success(function(response){
            if(response==="USER_NOT_EXIST"){
                $scope.loginError="El usuario no se encuentra registrado";
            }else if(response==="WRONG_PASSWORD"){
                $scope.loginError="La contraseña ingresada no coincide con la del usuario";
            }else{
                localStorage.setItem('accessToken',response);
                $location.path( "/" );
                location.reload();
            }
            console.log(response);

        });
    };



    init();

}]);