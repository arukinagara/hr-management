import { DataTypes } from 'sequelize'
import sequelize from './db'

const Project = sequelize.define('Project', {
  staffId:     { type: DataTypes.INTEGER, field: 'staff_id', allowNull: false, defaultValue: null, },
  startDate:   { type: DataTypes.DATEONLY, field: 'start_date', defaultValue: null, },
  endDate:     { type: DataTypes.DATEONLY, field: 'end_date', defaultValue: null, },
  name:        { type: DataTypes.STRING, allowNull: false, defaultValue: null, },
  description: { type: DataTypes.STRING, defaultValue: null, },
  notes:       { type: DataTypes.STRING, defaultValue: null, },
  createdAt:   { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:   { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, },
}, {
  // Other model options go here
});

export default Project
