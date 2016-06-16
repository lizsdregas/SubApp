
//////// angularfire
var app = angular.module("subApp", ["firebase"]);

app.controller("SubController", ["$scope", "$firebaseArray", controller]);

function controller($scope, $firebaseArray) {

    // firebase data location
    var firebaseUrl = 'https://sub-spa.firebaseio.com/requests';

    // download the data into a local object
    var ref = new Firebase(firebaseUrl);

    // create array
    $scope.requests = $firebaseArray(ref);

    // var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    // $scope.filteredMessages = $firebaseArray(query);

    // add new request
    $scope.addRequest = function(request) {
        $scope.requests.$add({
          name: request.name,
          email: request.email,
          date: request.date,
          fulfilled: false
        });
    };

    // update request
    $scope.addSub = function(request) {
     

    };

}
