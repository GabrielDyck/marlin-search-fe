/**
 * Created by gabrieldyck on 20/06/17.
 */

app.controller("hometransitController", ["$scope", "petPlanetServices", "$q", function ($scope, petPlanetServices, $q) {


    var box;

    $scope.title="Transito Animal";

    $scope.locationRequired=true;

    $scope.cleanRequireds= function(){
        if($scope.transit.transitId ==null ||$scope.transit.transitId =="" ){
            $scope.locationRequired=true;
        }else{
            $scope.locationRequired=false;
        }
    }


    $scope.petClassList = [];
    $scope.dogBreedList = [];
    $scope.catBreedList = [];
    $scope.animalAges=[];

    $q.all([
        petPlanetServices.petClass(),
        petPlanetServices.dogBreed(),
        petPlanetServices.catBreed(),
        petPlanetServices.getAnimalAge()
    ]).then(function (response) {
        $scope.petClassList = response[0].data;
        $scope.dogBreedList = response[1].data;
        $scope.catBreedList = response[2].data;
        $scope.animalAges = response[3].data;

        $("#pet-class").autocomplete({
            minLength: 0,
            source: $scope.petClassList,
            select: function (event, ui) {
                console.log($scope.petClassList);
                $scope.transit.animalType = ui.item.label;
                console.log($scope.transit.animalType);
                $scope.changeBreed();
            }
        }).focus(function () {
            $(this).autocomplete("search", $(this).val());
        });
        console.log(response);

    }).catch(function (error) {
        console.error(error);
    });

    $scope.changeBreed = function () {

        var petClass = $scope.transit.animalType;
        if (petClass != null) {
            if (petClass.toUpperCase() == "PERRO") {
                $("#pet-breed").attr("disabled", false);
                changeBreedByClass($scope.dogBreedList)
            } else if (petClass.toUpperCase() == "GATO") {
                $("#pet-breed").attr("disabled", false);

                changeBreedByClass($scope.catBreedList)
            } else {
                $scope.transit.animalBreed = "";
                $("#pet-breed").attr('disabled', true);
            }
        }
    };


    $scope.init = function () {

        $scope.transit={};
        $scope.transit.limit = 20;
        $scope.transit.animalType = "";
        $scope.transit.animalBreed = "";
        $scope.transit.transitId = "";
        $scope.transit.range = 0;
        $scope.searchResponse = null;
        $('#datePickerDesde').datetimepicker();
        $('#datePickerHasta').datetimepicker();
        $('#max-range').attr("disabled", true);
        if (window.map != null) {

            window.map = null;
            window.markerCenter = null;
        }

        if (box != null) {
            box.setMap(null);
        }
        box = null;


    };

    var changeBreedByClass = function (list) {
        $("#pet-breed").autocomplete({
            source: list,
            minLength: 3,
            select: function (event, ui) {
                $scope.transit.animalBreed = ui.item.label;
                $scope.changeBreed();
            }
        }).focus(function () {
            $(this).autocomplete("search", $(this).val());
        });
    };


    $scope.search = function (from) {

        if (checkSearchExceptions()) {

            if (from == 'button') {
                $scope.transit.page = 0;
                $('#pagination-top > li.active').removeClass('active');
                $('#pagination-top > li:nth-child(3)').addClass('active');
                $('#pagination-bottom > li.active').removeClass('active');
                $('#pagination-bottom > li:nth-child(3)').addClass('active');
            }

            if (window.map != null) {

                var range = $scope.transit.range;

                var northEast;
                var southWest;
                if (range == 0 || range == null) {

                    northEast = window.map.getBounds().getNorthEast();
                    southWest = window.map.getBounds().getSouthWest();

                } else {
                    //SACAR DE ACA Y PONERLO AL MODIFICAR EL RANGO
                    var ne = google.maps.geometry.spherical.computeOffset(window.markerCenter.position, range, 0);
                    ne = google.maps.geometry.spherical.computeOffset(ne, range, 90);
                    var se = google.maps.geometry.spherical.computeOffset(ne, range * 2, 180);
                    var sw = google.maps.geometry.spherical.computeOffset(se, range * 2, 270);
                    var nw = google.maps.geometry.spherical.computeOffset(sw, range * 2, 0);

                    northEast = box.getBounds().getNorthEast();
                    southWest = box.getBounds().getSouthWest();
                }

                console.log("NorthEast");
                console.log(northEast);

                console.log("SouthWest");
                console.log(southWest);
                var boundary = [
                    {latitude: northEast.lat(), longitude: northEast.lng()},
                    {latitude: northEast.lat(), longitude: southWest.lng()},
                    {latitude: southWest.lat(), longitude: northEast.lng()},
                    {latitude: northEast.lat(), longitude: southWest.lng()}];
                $scope.transit.boundary = boundary;
            }

            $('#pleaseWaitDialog').removeClass("hide");


            var request;
            if ($scope.transit.transitId != null && $scope.transit.transitId != "") {
                request = {
                    transitId:$scope.transit.transitId,
                    limit: $scope.transit.limit,
                }
            } else {

                request = angular.copy($scope.transit);
            }


            request = deleteEmptyOrNullFields(request);
            petPlanetServices.searchHomeTransit(request).success(function (response) {


                console.log(response);
                $scope.searchResponse = response.content;
                $scope.totalPages = response.totalPages;
                $scope.currentPage = response.page;
                $scope.isLast = response.isLast;

                $('#pleaseWaitDialog').addClass('hide');
                var totalPages=$scope.totalPages;

                if (totalPages> 0) {

                    console.log(totalPages);
                    var options = {
                        totalPages: totalPages,
                        visiblePages: 6,
                        startPage: $scope.currentPage+1,
                        next: 'Sig.',
                        prev: 'Ant.',
                        last:totalPages.toString(),
                        first:'1',
                        onPageClick: function (event, page) {

                            if (page != null) {
                                if ($scope.request.page !== (page - 1)) {

                                    console.log($scope.request.page);
                                    $scope.request.page = page - 1;
                                    $scope.search();
                                }
                            }
                        }
                    };
                    $('#pagination-top').twbsPagination('destroy');
                    $('#pagination-top').twbsPagination(options);

                    $('#pagination-bottom').twbsPagination('destroy');
                    $('#pagination-bottom').twbsPagination(options);

                }else{
                    $.notify("No encontramos resultados para los filtros aplicados.", "info");

                }


            });
        }else{
            $.notify("Los campos marcados con ( * ) son requeridos.", "error");

        }
    };


    $scope.cleanRange= function(){
        $scope.transit.range=0;
        if (box != null) {
            box.setMap(null);
        }
    }

    $scope.drawRange = function () {
        if (box != null) {
            box.setMap(null);
        }

        var range = $scope.transit.range;
        var ne = google.maps.geometry.spherical.computeOffset(window.markerCenter.position, range, 0);
        ne = google.maps.geometry.spherical.computeOffset(ne, range, 90);
        var se = google.maps.geometry.spherical.computeOffset(ne, range * 2, 180);
        var sw = google.maps.geometry.spherical.computeOffset(se, range * 2, 270);
        var nw = google.maps.geometry.spherical.computeOffset(sw, range * 2, 0);

        box = new google.maps.Rectangle({
            map: map,
            strokeOpacity: 5,
            bounds: new google.maps.LatLngBounds(sw, ne)
        });

    };


    $('.open-intro').click(function () {
        $('#contentWrap').removeClass("hide");
        $('.open-intro').hide();
        $('.close-intro').show();
    });


    $('.close-intro').click(function () {
        $('#contentWrap').addClass("hide");
        $('.open-intro').removeClass("hide");

        $('.open-intro').show();
        $('.close-intro').hide();
    });
    $scope.init();


    var checkSearchExceptions = function () {
        return ($scope.transit.transitId != null  && $scope.transit.transitId !="") || window.map != null;
    };

    var deleteEmptyOrNullFields = function (object) {
        Object.keys(object).forEach(function (key) {
            (object[key] == null || object[key] == "") && delete object[key]
        });
        return object;
    }
}]);