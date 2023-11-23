import { Sequelize, DataTypes } from "sequelize"
import loggingPretty from "logging-pretty"
import mariadb from "mariadb"

const log = loggingPretty(null, null)
const options: any = {
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

const sequelize = new Sequelize(options)
sequelize
  .authenticate()
  .then(() => {
    log.info("connection has been established successfully.")
  })
  .catch((err) => {
    log.error(`unable to connect to the database: ${err}`)
  })

export { sequelize, DataTypes }
