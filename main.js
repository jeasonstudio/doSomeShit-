var app = angular.module('myApp', []);

app.controller('someShitCtrl', function ($scope) {
    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    function EncodeUtf8(s1) {
        var s = escape(s1);
        var sa = s.split("%");
        var retV = "";
        if (sa[0] != "") {
            retV = sa[0];
        }
        for (var i = 1; i < sa.length; i++) {
            if (sa[i].substring(0, 1) == "u") {
                retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));

            }
            else retV += "%" + sa[i];
        }

        return retV;
    }
    function Str2Hex(s) {
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for (var i = 0; i < s.length; i++) {
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += Dec2Dig(eval(n));

        }
        //return value; 
        return digS;
    }
    function Dec2Dig(n1) {
        var s = "";
        var n2 = 0;
        for (var i = 0; i < 4; i++) {
            n2 = Math.pow(2, 3 - i);
            if (n1 >= n2) {
                s += '1';
                n1 = n1 - n2;
            }
            else
                s += '0';

        }
        return s;

    }
    function Dig2Dec(s) {
        var retV = 0;
        if (s.length == 4) {
            for (var i = 0; i < 4; i++) {
                retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
            }
            return retV;
        }
        return -1;
    }
    function Hex2Utf8(s) {
        var retS = "";
        var tempS = "";
        var ss = "";
        if (s.length == 16) {
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" + s.substring(4, 10);
            tempS += "10" + s.substring(10, 16);
            var sss = "0123456789ABCDEF";
            for (var i = 0; i < 3; i++) {
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i) + 1) * 8);



                retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
            }
            return retS;
        }
        return "";
    }

    var getMd5Sign = function (str) {
        var salt = GetRandomNum(1000000000, 9999999999);
        console.log(salt);
        var hash = hex_md5('20160811000026594' + str + salt + 'f5ZzwMc2MVY6ppH0ZgzM');
        console.log(hash);
        return encodeURI(hash);
    }

    var getEnglishShit = function (str) {
        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate?q=' + str + '&from=en&to=zh&appid=20160811000026594&salt=1435660658&sign=' + getMd5Sign(str),
            type: 'GET',
            dataType: 'JSONP',
            success: function (data) {
                console.log(data);
                console.log(data.trans_result[0].dst);
                return data.trans_result[0].dst;
            },
            error: function () {

            }
        });
    }

    $("#doSomeShit").on('click', function doSomeShit() {
        $scope.theShitYouEnter = $("#shit").val();

        var shitStr = EncodeUtf8("狗屎")
        console.log(getEnglishShit(shitStr));

    });
});