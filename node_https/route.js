var async = require("async");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var request = require("request");
var mysql = require("mysql");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var fs = require("fs");
console.log(__dirname);

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1q2w3e4r",
    database: "SHOPYMJ",
    connectionLimit: 50,
    waitForConnections: false,
    multipleStatements: true,
    dateStrings: "date",
    timezone: "+09:00",
    dialectOptions: {
        timezone: "+09:00", // DB에서 가져올 때 시간 설정
    },
});

function cyrb128(str, date) {
    // let date = new Date();

    let h1 = 1779033703 - date,
        h2 = 3144134277,
        h3 = 1013904242,
        h4 = 2773480762;

    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

/*
$db->query("insert into shop (authKey, userId, baseday) values ('$ahthKey','$userId','$baseDay')";
if( $db->error_no() != 0) {
	echo "<script>alert(\"".$db->error()."\"); </script> ";
	return;
}
echo "<script>alert('처리되었습니다.'); location.href='http://ymjlab.com'; </script> ";

CREATE TABLE `shop` (
 `seq` int(10) NOT NULL AUTO_INCREMENT,
 `authKey` char(10) NOT NULL,
 `userId` varchar(100) NOT NULL DEFAULT '',
 `baseDay` date NOT NULL,
 `result` char(1) DEFAULT 'N',
 regDate datetime,
 PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
*/

router.get("/test", function (req, res) {
    res.send("ok");
});

router.post("/shopHistory", function (req, res) {
    var authKey = req.body.authKey; //'3947429038';
    var nickName = req.body.nickName; //'alfie96';
    var day = req.body.baseDay;

    console.log(req.body);
    console.log(nickName, day, authKey);

    if (checkBlank(authKey) || checkBlank(nickName) || checkBlank(day)) {
        res.status(401).send("bad request");
        console.log("[" + nickName + "]", "[" + day + "]", "[" + authKey + "]");
        return;
    }
    var baseday = new Date(day);
    var ret = cyrb128(nickName, baseday.getDate()); //3947429038
    console.log("result(" + authKey + ")", ret);

    var rlt = "N";
    if (ret[0] == authKey) rlt = "Y";

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            console.log("return err");
            res.send(err);
            return;
        }
        connection.query(
            "insert into shop (authKey, userId, baseDay, result, regDate) values (?,?,?,?, now())",
            [authKey, nickName, baseday, rlt],
            function (err, rows) {
                if (err) {
                    connection.release();
                    console.log(this.sql);
                    console.log(err);
                    res.send(err);
                    return;
                }
                console.log("return ", rlt);
                res.send(rlt);
            }
        );
    });
});

String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
};

function checkBlank(str) {
    if (str == undefined || str.rtrim() == "") {
        return true;
    }
    return false;
}

module.exports = router;
