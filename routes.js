'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');



    app.route('/')
        .get(jsonku.index);

    // menampilkan  semua daata di database
    app.route('/tampil')
        .get(jsonku.tampilmahasiswa);
    // menampilkan daata di database berdasarkan Id
    app.route('/tampil/:id')
        .get(jsonku.tampilId);
    // menambah data ke database
    app.route('/tambah')
        .post(jsonku.tambahMahasiswa);
}