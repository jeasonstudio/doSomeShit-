var app = angular.module('myApp', []);

app.controller('someShitCtrl', function ($scope) {

    var appid = '20160811000026594';
    var key = 'f5ZzwMc2MVY6ppH0ZgzM';


    $("#doSomeShit").on('click', function makeIt() {
        var query = $("#shit").val();
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var salt = (new Date).getTime();
        var from = 'zh';
        var to = 'en';
        var str1 = appid + query + salt + key;
        var sign = hex_md5(str1);
        console.log(getAjaxShit(query, appid, salt, from, to, sign));

    });

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
                console.log(data);
                return data.trans_result[0].dst;
            },
            error: function (error) {
                console.log("Some Error");
             }
        });
    }


    // function GetRandomNum(Min, Max) {
    //     var Range = Max - Min;
    //     var Rand = Math.random();
    //     return (Min + Math.round(Rand * Range));
    // }
    // function EncodeUtf8(s1) {
    //     var s = escape(s1);
    //     var sa = s.split("%");
    //     var retV = "";
    //     if (sa[0] != "") {
    //         retV = sa[0];
    //     }
    //     for (var i = 1; i < sa.length; i++) {
    //         if (sa[i].substring(0, 1) == "u") {
    //             retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));

    //         }
    //         else retV += "%" + sa[i];
    //     }

    //     return retV;
    // }
    // function Str2Hex(s) {
    //     var c = "";
    //     var n;
    //     var ss = "0123456789ABCDEF";
    //     var digS = "";
    //     for (var i = 0; i < s.length; i++) {
    //         c = s.charAt(i);
    //         n = ss.indexOf(c);
    //         digS += Dec2Dig(eval(n));

    //     }
    //     //return value; 
    //     return digS;
    // }
    // function Dec2Dig(n1) {
    //     var s = "";
    //     var n2 = 0;
    //     for (var i = 0; i < 4; i++) {
    //         n2 = Math.pow(2, 3 - i);
    //         if (n1 >= n2) {
    //             s += '1';
    //             n1 = n1 - n2;
    //         }
    //         else
    //             s += '0';

    //     }
    //     return s;

    // }
    // function Dig2Dec(s) {
    //     var retV = 0;
    //     if (s.length == 4) {
    //         for (var i = 0; i < 4; i++) {
    //             retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
    //         }
    //         return retV;
    //     }
    //     return -1;
    // }
    // function Hex2Utf8(s) {
    //     var retS = "";
    //     var tempS = "";
    //     var ss = "";
    //     if (s.length == 16) {
    //         tempS = "1110" + s.substring(0, 4);
    //         tempS += "10" + s.substring(4, 10);
    //         tempS += "10" + s.substring(10, 16);
    //         var sss = "0123456789ABCDEF";
    //         for (var i = 0; i < 3; i++) {
    //             retS += "%";
    //             ss = tempS.substring(i * 8, (eval(i) + 1) * 8);



    //             retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
    //             retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
    //         }
    //         return retS;
    //     }
    //     return "";
    // }

    // var salt = GetRandomNum(1000000000, 9999999999);

    // var getMd5Sign = function (shitStr) {

    //     console.log(salt);
    //     var hash = hex_md5('20160811000026594' + shitStr + salt + 'f5ZzwMc2MVY6ppH0ZgzM');
    //     console.log(hash);
    //     return encodeURI(hash);
    // }

    // var getEnglishShit = function (shitStr) {

    //     var mySign = getMd5Sign(shitStr);

    //     $.ajax({
    //         url: 'http://api.fanyi.baidu.com/api/trans/vip/translate?q=' + shitStr + '&from=auto&to=zh&appid=20160811000026594&salt=' + salt + '&sign=' + mySign,
    //         type: 'GET',
    //         dataType: 'JSONP',
    //         success: function (data) {
    //             console.log(data);
    //             console.log(data.trans_result[0].dst);
    //             return data.trans_result[0].dst;
    //         },
    //         error: function () {

    //         }
    //     });
    // }

    // $("#doSomeShit").on('click', function doSomeShit() {
    //     $scope.theShitYouEnter = $("#shit").val();

    //     var shitStr = encodeURIComponent("fuck")

    //     console.log(shitStr);
    //     console.log(getEnglishShit(shitStr));

    // });
});