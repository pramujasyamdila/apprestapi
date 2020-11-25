'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');



    app.route('/')
        .get(jsonku.index);

    // menampilkan  semua daata di database
    app.route('/mahasiswa')
        .get(jsonku.tampilmahasiswa);
    // menampilkan daata di database berdasarkan Id
    app.route('/mahasiswa/:id')
        .get(jsonku.tampilId);
    // menambah data ke database
    app.route('/mahasiswa')
        .post(jsonku.tambahMahasiswa);
    // mengubah data ke database
    app.route('/mahasiswa')
        .put(jsonku.ubahMahasiswa);
}