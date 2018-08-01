var app = angular.module('funApp', ['firebase']); 

app.controller('MainCtrl', ['$scope', '$firebaseArray', '$firebaseObject', MainCtrl]);

function MainCtrl($scope, $firebaseArray, $firebaseObject) {

    // loading 
    $scope.dataLoaded = false;

    // on page load
    $scope.funIdea = false; 

    // create & load request data
    $scope.loadItems = function () {

        // firebase data location
        var firebaseUrl = 'https://funapp-15db5.firebaseio.com';

        // download the data into a local object 
        var ref = new Firebase(firebaseUrl);

        // create array
        $scope.items = $firebaseArray(ref);

        ref.on('value', function () {
            $scope.dataLoaded = true;
        }); 
    }

    // add new request
    $scope.addItem = function (item) {

        $scope.items.$add({
            name: item.name,
        }); 

        //clear the form 
        $scope.resetnewItemForm();
    }

    // reset request form
    $scope.resetnewItemForm = function(item) {
      $scope.itemFormMaster = {};
      $scope.item = angular.copy($scope.itemFormMaster);
      $scope.newItemForm.$setPristine();
      $scope.newItemForm.$setUntouched();
    }

    // generate fun
    $scope.generateFun = function () {
        var items = $scope.items;
        var randomItem = items[Math.floor(Math.random()*items.length)];
        $scope.randomItem = randomItem.name;
        $scope.funIdea = true;
    }

    // load app
    $scope.loadItems();
}