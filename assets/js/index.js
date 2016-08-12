var app = angular.module('myApp', []);

app.controller('someShitCtrl', function ($scope) {

    var appid = '20160811000026594';
    var key = 'f5ZzwMc2MVY6ppH0ZgzM';
    $scope.SHIT = '\0';

    function doMakeIt(theStr) {
        var query = theStr;
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var salt = (new Date).getTime();
        var from = 'zh';
        var to = 'en';
        var str1 = appid + query + salt + key;
        var sign = hex_md5(str1);
        console.log(getAjaxShit(query, appid, salt, from, to, sign));

    }

    var resultShit = function (shitArr) {
        //结果数组
        for( var i = 0 ; i < shitArr.length ; i++ ) {
            
        }

    }

    var getAjaxShit = function (query, appid, salt, from, to, sign) {
        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function (data) {
                if (data.error_code > 1) {
                    alert("Some Error!");
                } else {
                    console.log(data);
                    resultShit(data.trans_result);
                }

            },
            error: function (error) {
                console.log("Some Error");
            }
        });
    }

    $("#doSomeShit").on('click', function makeIt() {
        console.log("success");
        $scope.SHIT = $("#shit").val().split("");
        _.each($scope.SHIT, function (b, k) {
            if ($scope.SHIT[k] == "," || 　$scope.SHIT[k] == "，") {
                $scope.SHIT[k] = '\n';
            } else { }
        })
        console.log($scope.SHIT.join(""));
        doMakeIt($scope.SHIT.join(""));
    });
});




"需要首字母大写的单词".replace(/(\w)/,function(v){return v.toUpperCase()});