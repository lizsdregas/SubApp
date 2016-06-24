
//////// angularfire
var app = angular.module('subApp', ['firebase', 'ui.bootstrap']);

app.controller('SubController', ['$scope', '$firebaseArray', '$firebaseObject', SubController]);

function SubController($scope, $firebaseArray, $firebaseObject) {

    // loading
    $scope.dataLoaded = false;
     
    // create & load request data  
    $scope.loadRequests = function () {

        // firebase data location
        var firebaseUrl = 'https://sub-spa.firebaseio.com/requests';

        // download the data into a local object
        var ref = new Firebase(firebaseUrl);

        // create array
        $scope.requests = $firebaseArray(ref);

        ref.on('value', function () {
            $scope.dataLoaded = true; 
        })
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
            var displayDate = date.toString().substr(0, 15);
            return displayDate; 
        }

        var formatTime = function (hours, minutes, time) {
            var displayTime = request.classTimeHours + ':' + request.classTimeMinutes + request.classTimeAmPm;
            return displayTime;
        }

        var getSortDate = function(date, hours, minutes, ampm) {
            var getSortDate = date,
                hours = parseInt(hours, 10),
                ampm = ampm;

            if (ampm == "pm" && hours < 12) {
                 hours = hours + 12;
            }
            if (ampm == "am" && hours == 12) {
                hours = hours - 12;
            }

            getSortDate.setHours(hours);
            getSortDate.setMinutes(minutes);

            return getSortDate.toJSON();
        }

        $scope.requests.$add({ 
            className: request.className,
            date: getSortDate(request.datePickerDate, request.classTimeHours, request.classTimeMinutes, request.classTimeAmPm),
            displayDate: formatDate(request.datePickerDate),
            fulfilled: false,
            location: request.Location, 
            teacherEmail: request.teacherEmail,
            teacherName: request.teacherName, 
            time: formatTime(request.classTimeHours, request.classTimeMinutes, request.classTimeAmPm)
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

    $scope.openDatePicker = function () {
        $scope.datePicker.opened = true;
    };
     
    $scope.setDate = function (year, month, day) {
        $scope.datePickerDate = new Date(year, month, day);
    };

    $scope.format = 'shortDate'; 

    $scope.datePicker = {
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


    // init
    $scope.loadRequests(); 
}
