import { sequelize, DataTypes } from "../db"

const define = sequelize.define(
  "kategori",
  {
    id_kategori: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama_kategori: DataTypes.STRING
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
