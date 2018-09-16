/**
 * Created by gabrieldyck on 02/05/17.
 */
app.controller("userSettingsController", ["$scope", "petPlanetServices", "$location", "imageService","$q", function ($scope, petPlanetServices, $location, imageService,$q) {

    $scope.editUser = {};
    $scope.transit={};
    $scope.changePasswordWindowIsActive = false;
    $scope.showable = "PROFILE";
    $scope.changePasswordRequest = {};
    $scope.newPasswordConfirm = null;

    var blobProfilePhoto = null;


    $scope.getAccessToken = function () {
        var accessToken = localStorage.getItem('accessToken').split("-");
        return accessToken[1];
    };

    $scope.getUsername = function () {
        var accessToken = localStorage.getItem('accessToken').split("-");
        return accessToken[0];
    };


    $q.all([
        petPlanetServices.petClass(),
        petPlanetServices.dogBreed(),
        petPlanetServices.catBreed(),

    ]).then(function (response) {
        $scope.petClassList = response[0].data;
        $scope.dogBreedList = response[1].data;
        $scope.catBreedList = response[2].data;


        $scope.animalTypeAutocomplete = function () {
            $(('[id^="pet-class"]')).autocomplete({
                minLength: 0,
                source: $scope.petClassList,
                select: function (event, ui) {
                    var index = event.target.id.replace('pet-class', "");
                    $scope.animalTransit.transitTypes[index].animalType = ui.item.label;

                    $scope.changeBreed(index);
                }
            }).focus(function () {
                $(this).autocomplete("search", $(this).val());
            });

        }
    }
    ).catch(function (error) {
        console.error(error);
    });



    $scope.changeBreed = function (index) {
        $scope.animalTransit.transitTypes[index].animalType = $scope.animalTransit.transitTypes[index].animalType ==""? $("#pet-class" + index).val():$scope.animalTransit.transitTypes[index].animalType ;
    console.log(index);
        console.log($scope.animalTransit.transitTypes[index].animalType );

        var petClass = $scope.animalTransit.transitTypes[index].animalType ;
        if (petClass != null) {
            if (petClass.toUpperCase() == "PERRO") {
                $("#pet-breed" +index).attr("disabled", false);
                changeBreedByClass($scope.dogBreedList,index)
            } else if (petClass.toUpperCase() == "GATO") {
                $("#pet-breed"+index).attr("disabled", false);

                changeBreedByClass($scope.catBreedList,index)
            } else {
                $scope.animalTransit.transitTypes[index].animalBreed = "";
                $("#pet-breed"+index).attr('disabled', true);
            }
        }
    };

    var changeBreedByClass = function (list,index) {
        $("#pet-breed"+index).autocomplete({
            source: list,
            minLength: 3,
            select: function (event, ui) {
                $scope.animalTransit.transitTypes[index].animalBreed = ui.item.label;
                console.log($scope.animalTransit.transitTypes[index].animalType );
                $scope.changeBreed(index);
            }
        }).focus(function () {
            $(this).autocomplete("search", $(this).val());
        });
    };


    var userRequestPublication = {
        user: $scope.getUsername(),
        accessToken: $scope.getAccessToken()
    };
    petPlanetServices.getUserPublications(userRequestPublication).success(function (response) {
        console.log(response);
        $scope.userPublications = response;
    });
    petPlanetServices.getTransit(userRequestPublication).success(function (response) {
        console.log(response);
        $scope.animalTransit = response;
    }).error(function(){
        $scope.animalTransit = {};
        $scope.animalTransit.transitTypes = [];

    });

    petPlanetServices.getAnimalAge().success(function (response) {
        console.log(response);
        $scope.animalAges = response;
    });


    petPlanetServices.getProfileSettings({
        username: $scope.getUsername(),
        token: $scope.getAccessToken()
    }).success(function (response) {
        console.log(response);
        $scope.editUser = response;
        if (response.photo != null) {

            $("#photo-profile").attr("src", "data:image/png;base64," + response.photo);
        }
    });


    $scope.validatePassword = function () {
        console.log($scope.signRequest.password == $scope.newPasswordConfirm);
        $scope.passwordMatches = $scope.signRequest.password === $scope.confirmedPassword;
        return $scope.passwordMatches;

    };

    var settingTypes = ["PROFILE", "ACCOUNT", "PUBLICATIONS", "PETS"];

    $scope.activeChangePassword = function () {
        $scope.changePasswordWindowIsActive = true;
    };

    $scope.show = function (showable) {
        return $scope.showable == showable;
    };
    $scope.changeProfileImage = function () {
        if ($scope.editUser.photo != null) {
            var image = imageService.b64ToBlob($scope.editUser.photo, null);
            if (image != null) {
                blobProfilePhoto = image;
                var blobUrl = image.blobUrl;
                $("#photo-profile").attr("src", blobUrl);
            }
        }
    };

    $scope.updateProfile = function () {
        var accessToken = localStorage.getItem('accessToken').split("-");
        var request = angular.copy($scope.editUser);
        request.username = accessToken[0];
        request.token = accessToken[1];
        if (blobProfilePhoto != null) {
            request.photo = blobProfilePhoto.blob;
        }
        petPlanetServices.setProfileSettings(request).success(function () {
            location.reload();
        }).error(function () {
            console.log("Error in set profile");

        })
    };


    $scope.redirectToPublication = function (id) {
        return petPlanetServices.getServicePath("publicationSuccessfullyCreated").replace(":id", id);
    };


    $scope.selectActiveSettingType = function (type) {
        if (type === "ANIMAL_TRANSIT") {
            console.log("ANIMAL");
            initAutocomplete();
            $scope.animalTypeAutocomplete();
        }
        settingTypes.forEach(function (settingType) {
            $('#' + settingType).removeClass('active');
        });
        $('#' + type).addClass('active');
        $scope.showable = type;
    };

    $scope.changePassword = function () {
        var accessToken = localStorage.getItem('accessToken').split("-");
        var request = angular.copy($scope.changePasswordRequest);
        request.username = accessToken[0];
        request.token = accessToken[1];
        request.oldPassword = CryptoJS.SHA256($scope.changePasswordRequest.oldPassword).toString();
        request.newPassword = CryptoJS.SHA256($scope.changePasswordRequest.newPassword).toString();
        console.log(request);
        petPlanetServices.changePassword(request).success(function () {
            $location.path("cambio-password-exitoso");

        }).error(function () {
            console.log("Fallo el cambio de contraseña. To do message and diferentes response");
        })
    };
    $scope.parseDate = function (date) {
        return moment(date).format('DD/MM/YYYY')
    };

    $scope.createTransitType=function(){
        if($scope.animalTransit.transitTypes.length<3){
            $scope.animalTransit.transitTypes.push({});
        };
    };

    $scope.removeTransitType=function(index){
      $scope.animalTransit.transitTypes.splice(index, 1);
    };

    $scope.createHomeTransit= function(){

        console.log($scope.animalTransit);

        $scope.animalTransit.latitude= window.places? window.places[0].geometry.location.lat():  $scope.animalTransit.latitude;
            $scope.animalTransit.longitude= window.places? window.places[0].geometry.location.lng(): $scope.animalTransit.longitude;

        if($scope.transitValidateFields()){
            $scope.animalTransit.username=$scope.getUsername();
            $scope.animalTransit.accessToken=$scope.getAccessToken();

            petPlanetServices.createTransit($scope.animalTransit).success(function (response) {
                $.notify("Se ha postulado para transito animal", "success");
                $scope.animalTransit=response;
                console.log($scope.animalTransit);

            });

        }else{
            $.notify("Los campos marcados con ( * ) son requeridos.", "error");

        }
    };

    $scope.transitValidateFields = function () {
        var animalTransit = $scope.animalTransit;
        return $scope.validateField(animalTransit.contactName) &&
            $scope.validateField(animalTransit.phone) &&
            $scope.validateField(animalTransit.longitude) &&
            $scope.validateField(animalTransit.latitude) &&
            animalTransit.transitTypes.every(function(transit){
                return $scope.validateField(transit.animalType) &&
                $scope.validateField(transit.description) ;

            })
    };

    $scope.validateField = function (field) {
        return field != null && field != "";
    };

    return {
        getUsername: $scope.getUsername,
        getAccessToken: $scope.getAccessToken
    }


}]);
