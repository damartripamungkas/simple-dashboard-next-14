import { sequelize, DataTypes } from "../db"

const define = sequelize.define(
  "status",
  {
    id_status: {
      type: DataTypes.INTEGER({ length: 10 }),
      autoIncrement: true,
      primaryKey: true
    },
    nama_status: {
      type: DataTypes.STRING(100),
      unique: true
    }
  },
  {
    hooks: {
      beforeBulkCreate: (attr, opt) => {
        // empty
      }
    }
  }
)

export default define
