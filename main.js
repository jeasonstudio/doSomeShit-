var app = angular.module('myApp', []);

app.controller('someShitCtrl', function ($scope) {

    function doSomeShit() {
        $scope.theShitYouEnter = $("#shit").html();
        alert($scope.theShitYouEnter);
    }

});

