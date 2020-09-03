import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres://postgres:postgres@db:5432/postgres')

export default sequelize
