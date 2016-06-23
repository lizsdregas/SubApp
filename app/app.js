
//////// angularfire
var app = angular.module('subApp', ['firebase', 'ui.bootstrap']);

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
    $scope.addRequest = function (request) {

        var formatDate = function (date) {
            var formattedDate = date.toString().substr(0, 15);
            return formattedDate;
        }

        var getDateObject = function(date, hours, minutes) {
            var newDateObject = date;
            newDateObject.setHours(hours);
            newDateObject.setMinutes(minutes);

            return newDateObject.toJSON();
        }

        $scope.requests.$add({ 
            className: request.className,
            date: getDateObject(request.datePickerDate, hours, minutes),
            formattedDate: formatDate(request.datePickerDate), 
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

    // datepicker (ui bootstrap)
    $scope.today = function () {
        $scope.datePickerDate = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.datePickerDate = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2050, 12, 31),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.datePickerDate = new Date(year, month, day);
    };

    $scope.format = 'shortDate'; 

    $scope.popup1 = {
        opened: false
    };

    var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

    var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);

        $scope.events = [
      {
          date: tomorrow,
          status: 'full'
      },
      {
          date: afterTomorrow,
          status: 'partially'
      }
    ];

    function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return ''; 
    }

    // timepicker (ui bootstrap)
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.hours = 2;

    // init
    $scope.loadRequests(); 
}
