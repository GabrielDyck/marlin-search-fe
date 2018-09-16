/**
 * Created by gabrieldyck on 29/01/17.
 */

app.service("petPlanetServices",["$http",function($http){

    var urlMapper = {

        signIn: "http://www.marlin.com.ar/node-proxy/sign-in",
        login:  "http://www.marlin.com.ar/node-proxy/login",
        regenerateAT: "http://www.marlin.com.ar/node-proxy/user/regenerate-at",
        validateAT: "http://www.marlin.com.ar/node-proxy/user/validate-at",
        recoverPassword: "http://www.marlin.com.ar/node-proxy/user/recover-pw",
        changePassword: "http://www.marlin.com.ar/node-proxy/user/change-pw",
        getProfileSettings: "http://www.marlin.com.ar/node-proxy/user/get-profile-settings",
        setProfileSettings: "http://www.marlin.com.ar/node-proxy/user/set-profile-settings",
        createPublication: "http://www.marlin.com.ar/node-proxy/publication/create",
        searchPublication: "http://www.marlin.com.ar/node-proxy/publication/search",
        searchDetail: "http://www.marlin.com.ar/node-proxy/publication/detail",
        checkExistingMail: "http://www.marlin.com.ar/node-proxy/sign-in/valid-email",
        checkExistingUser: "http://www.marlin.com.ar/node-proxy/sign-in/valid-user",
        publicationTypes: "http://www.marlin.com.ar/node-proxy/interface/publication-types",
        petClass:"http://www.marlin.com.ar/node-proxy/interface/pet-class",
        dogBreed: "http://www.marlin.com.ar/node-proxy/interface/dog-breed",
        catBreed: "http://www.marlin.com.ar/node-proxy/interface/cat-breed",
        publicationSuccessfullyCreated: "http://www.marlin.com.ar/#/publicacion/:id",
        createComment: "http://www.marlin.com.ar/node-proxy/publication/createComment",
        getUserPublications: "http://www.marlin.com.ar/node-proxy/user/get-publications",
        isAuthotizedToEditPublication: "http://www.marlin.com.ar/node-proxy/publication/is-authotize-to-edit-publication",
        getPublicationStatus: "http://www.marlin.com.ar/node-proxy/publication/publication-status",
        getPublicationTypes: "http://www.marlin.com.ar/node-proxy/publication/publication-types",
        editPublication: "http://www.marlin.com.ar/node-proxy/publication/edit-publication",
        createTransit: "http://www.marlin.com.ar/node-proxy/transit/create",
        getTransit: "http://www.marlin.com.ar/node-proxy/transit/getTransit",
        getAnimalAge: "http://www.marlin.com.ar/node-proxy/interface/animal-age",
        searchTransits: "http://www.marlin.com.ar/node-proxy/transit/searchTransits",
        searchTransitsDetail:"http://www.marlin.com.ar/node-proxy/transit/searchTransitsDetail",
        getAnimalGenders:"http://www.marlin.com.ar/node-proxy/publication/animal-gender",
        getAnimalSize:"http://www.marlin.com.ar/node-proxy/publication/animal-size",
        getLastPublication:"http://www.marlin.com.ar/node-proxy/publication/getLastPublication"






    };

    var signIn= function(request){
        return $http.post(urlMapper.signIn,request)
    };

    var login= function(request){
        return $http.post(urlMapper.login,request)
    };

    var getByParams= function(url,request){
        return $http.get(url,{params:request})
    };


    var regenerateAT= function(request){
        return getByParams(urlMapper.regenerateAT,request);
    };


    var validateAT= function(request){
        return getByParams(urlMapper.validateAT,request);
    };

    var recoverPassword= function(request){
        return getByParams(urlMapper.recoverPassword,request);
    };

    var changePassword= function(request){
        return $http.post(urlMapper.changePassword,request)
    };

    var getProfileSettings= function(request){
        return $http.post(urlMapper.getProfileSettings,request)
    };

    var setProfileSettings= function(request){
        return $http.post(urlMapper.setProfileSettings,request)
    };

    var createPublication= function(request){
        return $http.post(urlMapper.createPublication,request)
    };

    var searchPublication= function(request){
        return $http.post(urlMapper.searchPublication,request)
    };

    var checkExistingMail= function(request){
        return getByParams(urlMapper.checkExistingMail,request)
    };

    var checkExistingUser= function(request){
        return getByParams(urlMapper.checkExistingUser,request)
    };

    var publicationTypes= function(request){
        return getByParams(urlMapper.publicationTypes,request)
    };

    var petClass= function(request){
        return getByParams(urlMapper.petClass,request)
    };

    var catBreed= function(request){
        return getByParams(urlMapper.catBreed,request)
    };

    var dogBreed= function(request){
        return getByParams(urlMapper.dogBreed,request)
    };


    var searchDetail= function(request){
        return getByParams(urlMapper.searchDetail,request)
    };

    var createComment= function(request){
        return $http.post(urlMapper.createComment,request)

    };

    var getServicePath= function(service){
         return urlMapper[service];
    };


    var getUserPublications= function(request){
        return getByParams(urlMapper.getUserPublications,request);
    };

    var isAuthotizedToEditPublication= function(request){
        return getByParams(urlMapper.isAuthotizedToEditPublication,request)
    };

    var getPublicationStatus= function(){
        return getByParams(urlMapper.getPublicationStatus,null)
    };

    var getPublicationTypes= function(){
        return getByParams(urlMapper.getPublicationTypes,null);
    };

    var editPublication= function(request){
        return $http.post(urlMapper.editPublication,request)
    };

    var createTransit= function(request){
        return $http.post(urlMapper.createTransit,request)

    };
    var getTransit= function(request){
        return $http.post(urlMapper.getTransit,request)

    };


    var getAnimalAge= function(){
        return $http.get(urlMapper.getAnimalAge)

    };

    var searchHomeTransit= function(request){
        return $http.post(urlMapper.searchTransits,request);

    };

    var searchTransitsDetail= function(request){
        return getByParams(urlMapper.searchTransitsDetail,request)
    };


    var getAnimalGenders= function(){
        return $http.get(urlMapper.getAnimalGenders)
    };

    var getAnimalSize= function(){
        return $http.get(urlMapper.getAnimalSize)
    };

    var getLastPublication= function(request){
        return $http.post(urlMapper.getLastPublication,request);
    };

    return{
        getServicePath:getServicePath,
        signIn:signIn,
        login:login,
        regenerateAT:regenerateAT,
        validateAT:validateAT,
        recoverPassword: recoverPassword,
        changePassword: changePassword,
        getProfileSettings:getProfileSettings,
        setProfileSettings:setProfileSettings,
        createPublication:createPublication,
        searchPublication:searchPublication,
        checkExistingMail:checkExistingMail,
        checkExistingUser:checkExistingUser,
        publicationTypes:publicationTypes,
        petClass:petClass,
        dogBreed:dogBreed,
        catBreed:catBreed,
        searchDetail:searchDetail,
        createComment:createComment,
        getUserPublications:getUserPublications,
        isAuthotizedToEditPublication:isAuthotizedToEditPublication,
        getPublicationStatus:getPublicationStatus,
        getPublicationTypes:getPublicationTypes,
        editPublication:editPublication,
        createTransit:createTransit,
        getTransit:getTransit,
        getAnimalAge:getAnimalAge,
        searchHomeTransit:searchHomeTransit,
        searchTransitsDetail:searchTransitsDetail,
        getAnimalGenders:getAnimalGenders,
        getAnimalSize:getAnimalSize,
        getLastPublication:getLastPublication
    };
}]);