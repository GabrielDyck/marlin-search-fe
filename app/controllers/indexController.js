// create the controller and inject Angular's $scope
/**
 * Created by gabrieldyck on 25/03/17.
 */

app.controller('indexController',["$scope","$location","petPlanetServices","$interval", function($scope,$location,petPlanetServices,$interval) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    /*var canvas = document.getElementById('myCanvas');
    var elem= document.getElementById("myelem");
    var clid= document.getElementById("clid");
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
        canvas.addEventListener('mousemove', function(evt) {

            setTimeout(function() {

                var mousePos = getMousePos(elem, evt);

                clid.style.position = "relative";
                clid.style.top = mousePos.y+"px";
                clid.style.left = mousePos.x+"px";
                clid.src="../images/huella.jpg";
                clid.style.height="50px";
                clid.style.width="50px";

            }, 200)

        }, false);


    function init()
    {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
*/
    $scope.notLogIn=true;
    var accessToken=localStorage.getItem("accessToken");
    if(accessToken !=null) {
        console.log(accessToken);
        $scope.username=accessToken.split("-")[0].toUpperCase();

        $interval(function() {
            accessToken=localStorage.getItem("accessToken");
            var token=accessToken.split("-")[1];
            var regenerateRequest={};
            regenerateRequest.username=$scope.username;
            regenerateRequest.token=token;
            petPlanetServices.regenerateAT(regenerateRequest).success(function(response){

                localStorage.setItem('accessToken',response);
            }).error(function (response) {
                console.log(response);
                localStorage.removeItem('accessToken');
                location.reload();
            });
        }, 60 * 1000*5);
        $scope.notLogIn = false;
    }
    $scope.exit = function(){
        localStorage.removeItem("accessToken");
        $location.path("/");
        location.reload();
    };
    //init();
}]);
