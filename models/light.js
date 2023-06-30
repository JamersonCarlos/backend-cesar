const {DataTypes} = require('sequelize');
const db = require('../db/conn');
const light = db.define('light', { 
    intensity: { 
        type: DataTypes.DOUBLE, 
        required: true,
    },
    status: { 
        type: DataTypes.BOOLEAN, 
    },
});

module.exports = light; 