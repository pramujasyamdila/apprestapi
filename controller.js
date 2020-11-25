'use strict';
var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("aplikasi berjalan res APInya", res)
};

// menampilkan semua data mahasiswa
exports.tampilmahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            response.ok(rows, res)
        }

    });

};


// menampilkan semua data mahasiswa berdasarkan id nya


exports.tampilId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa =?', [id],
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                response.ok(rows, res)
            }

        });
};

//membuat API untuk POST Tambah Data

exports.tambahMahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan)VALUES (?,?,?)',
        [nim, nama, jurusan],
        function (error, row, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menyimpan Data", res)
            }
        });
};
