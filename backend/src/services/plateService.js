// import global.db from '../server'

const vehiclePlateService = {
    // Thêm một biển số mới
    addPlate: async (plateData) => {
        const { plate_id, city, plate_type, vehicle_type } = plateData;
        const query = `INSERT INTO vehicle_registration_plates (plate_id, city, plate_type, vehicle_type) VALUES (?, ?, ?, ?)`;
        try {
            await global.db.run(query, [plate_id, city, plate_type, vehicle_type]);
            console.log('Plate added successfully.');
        } catch (error) {
            console.error('Error adding plate:', error);
        }
    },

    // Đọc thông tin của một biển số dựa trên plate_id
    getPlateById: async (plateId) => {
        const query = 'SELECT * FROM vehicle_registration_plates WHERE plate_id = ?';
        try {
            const plate = await global.db.get(query, [plateId]);
            return plate;
        } catch (error) {
            console.error('Error getting plate:', error);
        }
    },

    // Cập nhật thông tin của một biển số
    updatePlate: async (plateId, newData) => {
        const { city, plate_type, vehicle_type } = newData;
        const query = `UPDATE vehicle_registration_plates SET city = ?, plate_type = ?, vehicle_type = ? WHERE plate_id = ?`;
        try {
            await global.db.run(query, [city, plate_type, vehicle_type, plateId]);
            console.log('Plate updated successfully.');
        } catch (error) {
            console.error('Error updating plate:', error);
        }
    },

    // Xóa một biển số dựa trên plate_id
    deletePlate: async (plateId) => {
        const query = 'DELETE FROM vehicle_registration_plates WHERE plate_id = ?';
        try {
            await global.db.run(query, [plateId]);
            console.log('Plate deleted successfully.');
        } catch (error) {
            console.error('Error deleting plate:', error);
        }
    }
};

module.exports = vehiclePlateService;