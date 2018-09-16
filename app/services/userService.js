app.service("userService", [function () {



    var isLogged = function (){
        return localStorage.getItem('accessToken')!=null;
    };

    var getAccessToken= function(){
        var accessToken=localStorage.getItem('accessToken').split("-");
        return accessToken[1];
    };

    var getUsername= function(){
        var accessToken=localStorage.getItem('accessToken').split("-");
        return accessToken[0];
    };

    return {
        getAccessToken:getAccessToken,
        getUsername:getUsername,
        isLogged:isLogged
    }
}]);