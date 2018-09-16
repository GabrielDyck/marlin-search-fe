// create the module and name it app
var app = angular.module('app', ['ngRoute']);

// configure our routes
app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        rewriteLinks: true
    });
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .when('/animales-perdidos', {
            templateUrl: 'pages/search-page.html',
            controller: 'missingController'
        })
        /*
        .when('/donations', {
            templateUrl: 'pages/donations.html',
            controller: 'donationsController'
        })*/
        .when('/animales-encontrados', {
            templateUrl: 'pages/search-page.html',
            controller: 'foundController'
        })
        .when('/animales-adopcion', {
            templateUrl: 'pages/search-page.html',
            controller: 'adoptionController'
        })
        /*
        .when('/events', {
            templateUrl: 'pages/event.html',
            controller: 'eventController'
        })
        */
        .when('/noticias', {
            templateUrl: 'pages/news.html',
            controller: 'newsController'
        })
        .when('/ingresar', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })
        .when('/registrarse', {
            templateUrl: 'pages/signin.html',
            controller: 'signinController'
        })
        .when('/recordar-contraseña', {
            templateUrl: 'pages/rememberPassword.html',
            controller: 'rememberPasswordController'
        })
        .when('/crear-publicacion', {
            templateUrl: 'pages/createPublication.html',
            controller: 'createPublicationController'
        })
        .when('/cuenta-creada', {
            templateUrl: 'pages/message.html',
            controller: 'accountCreatedController'
        })
        .when('/recuperar-password-informada', {
            templateUrl: 'pages/message.html',
            controller: 'recoverPasswordInformedController'
        })
        .when('/ajustes-cuenta', {
            templateUrl: 'pages/userSettings.html',
            controller: 'userSettingsController'
        })
        .when('/cambio-password-exitoso', {
            templateUrl: 'pages/message.html',
            controller: 'changePasswordInformedController'
        })
        /*
        .when('/profile/:username*', {
            templateUrl: 'pages/profile.html',
            controller: 'profileController'
        })
        */
        .when("/publicacion/:id*", {
            templateUrl: 'pages/search-detail.html',
            controller: 'searchDetailController'
        })
        .when("/editar-publicacion", {
            templateUrl: 'pages/editPublication.html',
            controller: 'editPublicationController'
        })
        .when("/transito-animal", {
            templateUrl: 'pages/hometransit.html',
            controller: 'hometransitController'
        })
        .when("/transito-animal/:id*", {
        templateUrl: 'pages/hometransitDetail.html',
        controller: 'hometransitDetailController'
    })

});


app.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});


app.controller('accountCreatedController', function ($scope) {
    $scope.title = "Felicitaciones";
    $scope.message = 'Tu cuenta ha sido creada con exito.';
});

app.controller('recoverPasswordInformedController', function ($scope) {
    $scope.title = "Hecho";
    $scope.message = 'Hemos reestablecido tu contraseña y enviado un mail con tu nueva contraseña. Recuerda que puedes cambiarlo entrando a tu cuenta.';
});

app.controller('changePasswordInformedController', function ($scope) {
    $scope.title = "Hecho";
    $scope.message = 'Has cambiado tu contraseña.';
});


Date.prototype.plusHours = function (hours) {
    return this.setHours(this.getHours() + hours);
};

Date.prototype.minusHours = function (hours) {
    return this.setHours(this.getHours() - hours);
};

Date.prototype.plusDays = function (days) {
    return this.plusHours(days * 24);
};

Date.prototype.minusDays = function (days) {
    return this.minusHours(days * 24);
};

Date.prototype.beginningOfDay = function () {
    return new Date(this.setHours(0, 0, 0, 0));
};

Date.prototype.endOfDay = function () {
    return new Date(this.setHours(23, 59, 59, 0));
};