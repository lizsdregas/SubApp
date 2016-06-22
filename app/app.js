
//////// angularfire
var app = angular.module('subApp', ['firebase']);

app.controller('SubController', ['$scope', '$firebaseArray', '$firebaseObject', SubController]);

function SubController($scope, $firebaseArray, $firebaseObject) {

    // create & load request data 
    $scope.loadRequests = function () {
        // firebase data location
        var firebaseUrl = 'https://sub-spa.firebaseio.com/requests';

        // download the data into a local object
        var ref = new Firebase(firebaseUrl);

        // create array
        $scope.requests = $firebaseArray(ref);
    }

    // hide request form on page load
    $scope.requestFormVisible = false;

    // toggle request form visibility
    $scope.toggleNewRequestForm = function () {
        $scope.requestFormVisible = !$scope.requestFormVisible;
    }

    // var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    // $scope.filteredMessages = $firebaseArray(query);

    // add new request
    $scope.addRequest = function(request) {
        $scope.requests.$add({
            className: request.className,
            date: request.date,
            fulfilled: false,
            teacherEmail: request.teacherEmail,
            teacherName: request.teacherName,
            time: request.time
    });

        $scope.toggleNewRequestForm();
    }

    // update request with sub
    $scope.addSub = function(request) {
        request.fulfilled = true;
        request.subName = request.subName;
        request.subEmail = request.subEmail;  
        $scope.requests.$save(request).then(function () {
            $scope.loadRequests();
        });
    }

    // init
    $scope.loadRequests(); 
}
