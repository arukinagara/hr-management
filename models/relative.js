import { DataTypes } from 'sequelize'
import sequelize from './db'

const Relative = sequelize.define('Relative', {
  staffId:         { type: DataTypes.INTEGER, field: 'staff_id', allowNull: false, defaultValue: null, },
  dependantReason: { type: DataTypes.STRING, field: 'dependant_reason', defaultValue: null, },
  fullName:        { type: DataTypes.STRING, field: 'full_name', defaultValue: null, },
  furigana:        { type: DataTypes.STRING, defaultValue: null, },
  relation:        { type: DataTypes.STRING, defaultValue: null, },
  isLiveWith:      { type: DataTypes.BOOLEAN, field: 'is_live_with', defaultValue: null, },
  postalCode:      { type: DataTypes.STRING, field: 'postal_code', defaultValue: null,},
  address1:        { type: DataTypes.STRING, defaultValue: null, },
  address2:        { type: DataTypes.STRING, defaultValue: null, },
  address3:        { type: DataTypes.STRING, defaultValue: null, },
  phoneNumber:     { type: DataTypes.STRING, field: 'phone_number', defaultValue: null, },
  createdAt:       { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:       { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, },
}, {
  // Other model options go here
});

export default Relative
