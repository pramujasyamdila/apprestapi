'use strict';
var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("aplikasi berjalan res APInya", res)
};

exports.tampilmahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (err, rows, field) {
        if (err) {
            connection.log(err);
        } else {
            response.ok(rows, res)
        }

    });

};