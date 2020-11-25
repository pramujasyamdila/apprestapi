var connection = require('../koneksi');

var mysql = require('mysql');
var md5 = ('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register

exports.registrasi = function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        passsword: md5(req.body.passsword),
        role: req.body.role,
        tanggal_daftar: new Date()
    }
    //cek query untuk mengetahui apakah email sudah terdaftar atau belom jika sudah maka sudah tidak bisa lagi
    var query = "SELECT email FROM ?? WHERE ??";
    var table = ["user", "email", post.email];
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.lenght == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("oke berhasil menambahkan data user baru", res);
                    }
                });
            } else {
                response.ok("Email Sudah Terdaftar");
            }
        }
    })
}