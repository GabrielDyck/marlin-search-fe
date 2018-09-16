/**
 * Created by gabrieldyck on 25/03/17.
 */
app.controller("createPublicationController", ["$scope", "petPlanetServices", "userService", '$q', function ($scope, petPlanetServices, userService, $q) {
    $scope.publication = {};
    $scope.publication.location = {};

    $q.all([
        petPlanetServices.petClass(),
        petPlanetServices.dogBreed(),
        petPlanetServices.catBreed(),
        petPlanetServices.getPublicationTypes(),
        petPlanetServices.getAnimalGenders(),
        petPlanetServices.getAnimalSize()
    ]).then(function (response) {
        $scope.petClassList = response[0].data;
        $scope.dogBreedList = response[1].data;
        $scope.catBreedList = response[2].data;
        $scope.publicationTypes = response[3].data;
        $scope.animalGenders = response[4].data;
        $scope.animalSizes = response[5].data;


            $("#pet-class").autocomplete({
                minLength: 0,
                source: $scope.petClassList,
                select: function (event, ui) {
                    console.log($scope.petClassList);
                    $scope.publication.petClass = ui.item.label;
                    console.log($scope.publication.petClass);
                    $scope.changeBreed();
                }
            }).focus(function () {
                $(this).autocomplete("search", $(this).val());
            });
        console.log(response);

    }).catch(function (error) {
        console.error(error);
    });

    $scope.isCreateWithUser= function(){
        return userService.isLogged() ;
    };

    $scope.changeBreed = function () {
        var petClass = $scope.publication.petClass;
        if (petClass != null) {
            if (petClass.toUpperCase() == "PERRO") {
                $("#pet-breed").attr("disabled", false);
                changeBreedByClass($scope.dogBreedList)
            } else if (petClass.toUpperCase() == "GATO") {
                $("#pet-breed").attr("disabled", false);

                changeBreedByClass($scope.catBreedList)
            } else {
                $scope.publication.petBreed = "";
                $("#pet-breed").attr('disabled', true);
            }
        }
    };

    var changeBreedByClass = function (list) {
        $("#pet-breed").autocomplete({
            source: list,
            minLength: 3,
            select: function (event, ui) {
                $scope.publication.petBreed = ui.item.label;
                console.log($scope.publication.petBreed);
                $scope.changeBreed();
            }
        }).focus(function () {
            $(this).autocomplete("search", $(this).val());
        });
    };


    $scope.createPublication = function () {

        if ($scope.validateFields()) {
            $('#pleaseWaitDialog').removeClass("hide");

            if(userService.isLogged()){

                $scope.publication.username = userService.getUsername();
                $scope.publication.accessToken = userService.getAccessToken();

            }
            $scope.publication.location.latitude = window.places[0].geometry.location.lat();
            $scope.publication.location.longitude = window.places[0].geometry.location.lng();


            $scope.publication.images = window.files;
            $scope.publication.stringLocation=$("#pac-input").val();

            $scope.publication.description=emojiStrip($scope.publication.description);
            $scope.publication.petName=emojiStrip($scope.publication.petName);
            $scope.publication.contactName=emojiStrip($scope.publication.contactName);
            $scope.publication.phone=emojiStrip($scope.publication.phone);
            $scope.publication.email=emojiStrip($scope.publication.email);


            petPlanetServices.createPublication($scope.publication).success(function (id) {
                $('#pleaseWaitDialog').addClass('hide');
                $('#pleaseWaitDialog').addClass('hide');

                $("#publish-button").attr("disabled", true);
                window.location = petPlanetServices.getServicePath("publicationSuccessfullyCreated").replace(":id", id);
            }).error(function(){
                $.notify("Hubo un error al crear la publicacion. Corrobore los datos ingresados o intentelo nuevamente. Disculpe las molestias.", "error");


            });

        } else {

            $.notify("Los campos marcados con ( * ) son requeridos.", "error");
        }
    };


    $scope.validateFields = function () {
        var publication = $scope.publication;
        return $scope.validateField(publication.title) &&
            $scope.validateField(publication.petClass) &&
            $scope.validateField(publication.type) &&
            $scope.validateField(publication.description) &&
            publication.location != null;
    };

    $scope.validateField = function (field) {
        return field != null && field != "";
    };

    $scope.loadImages = function () {
        Array.from(window.files).forEach(function (file) {
            var fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = function (e) {
                $scope.publication.images.push(fr.result);
            };
        });
    }

}]);