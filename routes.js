'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');



    app.route('/')
        .get(jsonku.index);

    // API menampilkan  semua daata di database
    app.route('/mahasiswa')
        .get(jsonku.tampilmahasiswa);
    // API menampilkan daata di database berdasarkan Id
    app.route('/mahasiswa/:id')
        .get(jsonku.tampilId);
    // API menambah data ke database
    app.route('/mahasiswa')
        .post(jsonku.tambahMahasiswa);
    // API mengubah data ke database
    app.route('/mahasiswa')
        .put(jsonku.ubahMahasiswa);
    // API menghapus data ke database
    app.route('/mahasiswa')
        .delete(jsonku.hapusMahasiswa);
}