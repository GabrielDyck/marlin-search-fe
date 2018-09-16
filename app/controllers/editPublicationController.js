app.controller("editPublicationController", ['$scope', '$controller', 'userService', 'petPlanetServices', function ($scope, $controller, userService, petPlanetServices) {
    $controller('createPublicationController', {$scope: $scope});


    function init() {
        $scope.publication = JSON.parse(localStorage.getItem("editPublication"));
        console.log($scope.publication);
        $("#pac-input").val($scope.publication.stringLocation);

        var output = document.querySelector('.output');
        petPlanetServices.getPublicationStatus().success(function(response){
            $scope.statusData=response;
        });



        var images = $scope.publication.images;
        if (images != null && images.length > 0) {
            var index=0;
            output.innerHTML = "";
            images.forEach(function (image) {
                image='data:image/jpeg;base64,' + image;
                $scope.publication.images[index]=image;
                output.innerHTML += '<img width="150" src= ' +  image + ' alt="' + $scope.publication.title + '">'
            })

        }
    }

    $scope.editPublication = function () {
        $scope.publication.stringLocation=$("#pac-input").val();

        var request= {

            id: $scope.publication.id,
            username: userService.getUsername(),
            accessToken: userService.getAccessToken(),
            location: {
                latitude: window.places? window.places[0].geometry.location.lat():  $scope.publication.latitude,
                longitude: window.places? window.places[0].geometry.location.lng(): $scope.publication.longitude
            },
            title: $scope.publication.title,
            description: $scope.publication.description,
            images: window.files ? window.files :$scope.publication.images,
            contactName: $scope.publication.contactName,
            status: $scope.publication.status,
            phone:$scope.publication.phone,
            email:$scope.publication.email,
            petClass: $scope.publication.petClass,
            petBreed:$scope.publication.petBreed,
            type:$scope.publication.type,
            petName:$scope.publication.petName,
            stringLocation:$scope.publication.stringLocation,
            size:$scope.publication.size,
            color: $scope.publication.color,
            gender:$scope.publication.gender

        };

        if($scope.validateFields(request)){
            $('#pleaseWaitDialog').removeClass('hide');

            console.log(request);
            petPlanetServices.editPublication(request).success(function (id) {
                $('#pleaseWaitDialog').addClass('hide');

                $("#publish-button").attr("disabled", true);
                window.location = petPlanetServices.getServicePath("publicationSuccessfullyCreated").replace(":id", id);
            });
        }else{
            $.notify("Los campos marcados con ( * ) son requeridos.", "error");

        }

};

    $scope.validateFields = function (request) {
        return $scope.validateField(request.title) &&
            $scope.validateField(request.petClass) &&
            $scope.validateField(request.type) &&
            $scope.validateField(request.description) &&
            request.location != null;
    };

    $scope.validateField = function (field) {
        return field != null && field != "";
    };
    init();
}])
;