app.controller("HomeController", ["$scope", "petPlanetServices", function ($scope,petPlanetServices) {

    var init = function () {
        $scope.request={};
        $scope.request.page = 0;

        petPlanetServices.getLastPublication($scope.request).success(function (response) {

            console.log(response);
            $scope.searchResponse = response.content;
            $scope.totalPages = response.totalPages;
            $scope.currentPage = response.page;
            $scope.isLast = response.isLast;

            var totalPages = $scope.totalPages;
            if (totalPages > 0) {


                console.log(totalPages);
                var options = {
                    totalPages: totalPages,
                    visiblePages: 6,
                    startPage: $scope.currentPage + 1,
                    next: 'Sig.',
                    prev: 'Ant.',
                    last: totalPages.toString(),
                    first: '1',
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


            }})};

    init();
}]);