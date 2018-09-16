/**
 * Created by gabrieldyck on 28/05/17.
 */

app.controller("searchDetailController", ["$scope", "petPlanetServices", "$location", "userService", function ($scope, petPlanetServices, $location, userService) {

    var absoluteUrl = $location.absUrl().split('/');

    var publicationId = absoluteUrl[absoluteUrl.length - 1];

    $scope.parseDate = function (date) {

        return moment(date).format('DD/MM/YYYY')

    };
    $scope.changeMataTags=function(){

        $('meta[property="og:title"]').attr('content', $scope.publication.title);
        $('meta[property="og:description"]').attr('content', $scope.publication.description);
        $('meta[property="og:image"]').attr('content',"http://35.196.175.6:8080/publication/getImage?id=" +publicationId );
        $('meta[property="og:url"]').attr('content', window.location.href);
    };

    var getSearchDetail = function () {
        var request = {id: publicationId};

        petPlanetServices.searchDetail(request).success(function (response) {
            console.log(response);
            $scope.publication = response;
            $scope.changeMataTags();

            window.publication = response;

        });
    };



    $scope.showPlaceHolder = function () {
        if ($scope.publication.images.length == 0) {
            $("#placeholder-img").show();
        }else{
            $("#placeholder-img").hide();

        }
    };

    $scope.createComment = function () {
        var commentRequest = {
            userName: $scope.name,
            content: $scope.comment,
            publicationId: publicationId
        };
        petPlanetServices.createComment(commentRequest).success(function () {
            getSearchDetail();
        })

    };

    function isAuthotizedToEditPublication() {
        if (userService.isLogged()) {


            var request = {
                publicationId: publicationId,
                user: userService.getUsername(),
                accessToken: userService.getAccessToken()
            };

            petPlanetServices.isAuthotizedToEditPublication(request).success(function (response) {
                $scope.isAuthotized = response;
            })
        }
    };


    $scope.editPublication = function () {
        var publication = {
            accessToken: userService.getAccessToken(),
            contactName: $scope.publication.contactName,
            description: $scope.publication.description,
            email: $scope.publication.email,
            images: $scope.publication.images,
            latitude: $scope.publication.location.latitude,
            longitude: $scope.publication.location.longitude,
            petBreed: $scope.publication.petBreed,
            petClass: $scope.publication.petClass,
            phone: $scope.publication.phone,
            title: $scope.publication.title,
            type: $scope.publication.type,
            id: publicationId,
            petName:$scope.publication.petName,
            stringLocation:$scope.publication.stringLocation,
            size:$scope.publication.size,
            color: $scope.publication.color,
            gender:$scope.publication.gender,
            status: $scope.publication.status,
            username: userService.getUsername()
        };
        localStorage.setItem('editPublication', JSON.stringify(publication));
        $location.path("/editar-publicacion");

    };
    getSearchDetail();
    isAuthotizedToEditPublication();
}]);