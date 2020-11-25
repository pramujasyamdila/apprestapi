'use strict';

exports.ok = function (value, res) {
    var data = {
        'status': 200,
        'value': value
    };
    res.json(data);
    res.end();
}

//respons untuk nested kecamatan

exports.oknested = function (values, res) {
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        if (akumulasikan[item.nama]) {
            const group = akumulasikan[item.nama];
            if (Array.isArray(group.kecamatan)) {
                group.kecamatan.push(item.kecamatan);
            } else {
                group.kecamatan = [group.kecamatan, item.kecamatan];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status': 200,
        'value': hasil
    };
    res.json(data);
    res.end();
}