const DiemGiaoDich = require('../models/DiemGiaoDich');

const handleNewDiemGiaoDich = async (req, res) => {
    const { 
        diem_giao_dich_id,
        diem_tap_ket_id,
        dia_chi
    } = req.body;
    console.log(req.body);

    const duplicate = await DiemGiaoDich.findOne({diem_giao_dich_id: diem_giao_dich_id}).exec();
    if (duplicate) return res.status(409); // conflict

    try {
        const result = await DiemTapKet.create({
            "diem_giao_dich_id": diem_giao_dich_id,
            "diem_tap_ket_id": diem_tap_ket_id,
            "dia_chi": dia_chi
        });

        console.log(result)
        res.status(201).json({'message': "New DiemGiaoDich created!"});
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

const getDiemGiaoDich = async (req, res) => {
    try {
        let results = await DiemGiaoDich.find({});
        res.send(results).status(200);
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = { 
    handleNewDiemGiaoDich,
    getDiemGiaoDich
}