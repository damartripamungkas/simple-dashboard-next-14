import { sequelize, DataTypes } from "../db"

const define = sequelize.define(
  "status",
  {
    id_status: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama_status: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (attr, opt) => {
        // empty
      }
    }
  }
)

export default define
