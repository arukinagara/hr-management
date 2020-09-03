import { DataTypes } from 'sequelize'
import sequelize from './db'

const User = sequelize.define('User', {
  // Model attributes are defined here
  username:  { type: DataTypes.STRING, allowNull: false, },
  salt:      { type: DataTypes.STRING, allowNull: false, },
  hash:      { type: DataTypes.STRING, allowNull: false, },
  createdAt: { type: DataTypes.DATE, field: 'created_at', },
  updatedAt: { type: DataTypes.DATE, field: 'updated_at', },
}, {
  // Other model options go here
});

export default User
