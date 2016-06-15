
//////// angularfire

var app = angular.module("subApp", ["firebase"]);

app.controller("SubController", ["$scope", "$firebaseObject", controller]);

function controller($scope, $firebaseObject) { 

    // download the data into a local object 
    var ref = new Firebase("https://sub-spa.firebaseio.com");
    $scope.data = $firebaseObject(ref);
    
    $scope.requests = $firebaseObject(ref.child('requests'));
   
    //remove request 
    $scope.removeRequest = function (id) {
        var testRef = new Firebase("https://sub-spa.firebaseio.com");
        var newRef = testRef.child(id);
        newRef.$remove(); 
    }  


}