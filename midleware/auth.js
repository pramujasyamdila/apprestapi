var connection = require('../koneksi');

var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
//==============================//controller untuk register\\==================================


exports.registrasi = function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
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
//===========================//membuat controller Login\\=======================================


exports.login = function (req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?"; //ketika loginya bener
    var table = ["user", "password", md5(post.password), "email", post.email];

    //tampilkan data ada apa nggak post tokenya 
    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) { // jika ada si jwt buat token
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440 //expired token
                });
                id_user = rows[0].id; //id itu yg ada di akses nya yg di join
                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()

                }
                // query untuk menampung datanya
                var query = "INSERT INTO ?? SET?";
                var table = ["akses_token"];//nama tablenya

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else {
                res.json({ "Error": true, "Message": "Email atau Password Salah!" });
            }
        }
    });
}

exports.halamanrahasia = function (req, res) {
    response.ok("Halaman Ini Hanya Untuk Role User nya = 2", res);
}