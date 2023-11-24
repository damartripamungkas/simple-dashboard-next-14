import { Sequelize, DataTypes } from "sequelize"
import mariadb from "mariadb"
import log from "~/utils/log"

const optSequelize: any = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    timestamps: false
  },
  dialectModule: mariadb,
  logging: (str: any) => log.info(`sequelize: ${str}`)
}

const optMariadb: any = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  timeout: 15000
}

const sequelize = new Sequelize(optSequelize)
const authenticate = async () => {
  try {
    const mariadbConnect = await mariadb.createConnection(optMariadb)
    await mariadbConnect.query(`CREATE DATABASE IF NOT EXISTS ${sequelize.config.database}`)
    await mariadbConnect.end()
    await sequelize.authenticate()
    log.info("connection has been established successfully.")
  } catch (err) {
    log.error(`unable to connect to the database: ${err}`)
  }
}

authenticate()

export { sequelize, DataTypes }
