import { DataTypes } from 'sequelize'
import sequelize from './db'

const Qualification = sequelize.define('Qualification', {
  staffId:        { type: DataTypes.INTEGER, field: 'staff_id', allowNull: false, defaultValue: null, },
  name:           { type: DataTypes.STRING, allowNull: false, defaultValue: null, },
  getDate:        { type: DataTypes.DATEONLY, field: 'get_date', defaultValue: null, },
  number:         { type: DataTypes.STRING, defaultValue: null, },
  expirationDate: { type: DataTypes.DATEONLY, field: 'expiration_date', defaultValue: null, },
  createdAt:      { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:      { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, },
}, {
  // Other model options go here
});

export default Qualification
