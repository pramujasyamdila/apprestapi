var connection = require('../koneksi');

var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register

exports.registrasi = function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        tanggal_daftar: new Date
    }
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil tambah data", res);
                    }
                });
            } else {
                response.ok("email sudah terdaftar", res);
            }
        }
    })
}

//cek query untuk mengetahui apakah email sudah terdaftar atau belom jika sudah maka sudah tidak bisa lagi