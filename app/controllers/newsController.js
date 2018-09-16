/**
 * Created by gabrieldyck on 22/01/17.
 */

app.controller("newsController", ["$scope", function($scope) {

    $scope.news=[];

    var notice1="Buenas tardes a todos.\nEn estos últimos meses estuve trabajando en crear una pagina para facilitar y centralizar las búsquedas de animales perdidos, encontrados adopciones y transito animal. \nEl sistema cuenta con distintos filtros(Nombre, Raza, Especie, Ubicacion,Rango*en metros*,Fechas*Rango*), para enriquecer nuestras busquedas.\nLo novedoso es que podemos acotar nuestras búsquedas por coordenadas a la redonda.\nEs decir, si yo pierdo a mi mascota, en este caso un perro, en Rodriguez Peña al 1000, puedo buscar perros que hayan sido encontrados 100 metros, 500 metros, 1000 metros a la redonda de Rodriguez Peña al 1000. Lo mismo para el caso contrario de si yo encuentro una mascota.\nPara que la funcionalidad de la pagina realmente sea poderosa y tenga impacto en las búsquedas esta en cada uno de nosotros el publicar en esta pagina y que sea nuestra 1° referencia para cuando ocurre un evento con nuestra mascota.\nEs totalmente gratis publicar y usar la aplicacion.\nEstoy abierto a cualquier tipo de duda, consulta, critica, o mejora.\nSin mas que decir, les dejo la pagina:\nhttp://www.marlin.com.ar \nY nuestra pagina de facebook: \nhttps://www.facebook.com/MarlinSearch/";
    $scope.news.push(notice1);



}]);