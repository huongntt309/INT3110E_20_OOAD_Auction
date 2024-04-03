const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taiKhoanSchema = new Schema({
    ten_dang_nhap: {
        type: String, 
        required: true,
        unique: true,
    },
    mat_khau: {
        type: String, 
        required: true
    },
    ho_ten: {
        type: String, 
        required: true,
    },
    chuc_vu_id: {
        type: String, 
        required: true,
    },
    diem_tap_ket_id: String,
    diem_giao_dich_id: String,
    refreshToken: String
});

module.exports = mongoose.model('TaiKhoan', taiKhoanSchema)