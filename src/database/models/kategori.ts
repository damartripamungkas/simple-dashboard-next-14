import { sequelize, DataTypes } from "../db"

const define = sequelize.define(
  "kategori",
  {
    id_kategori: {
      type: DataTypes.INTEGER({ length: 10 }),
      autoIncrement: true,
      primaryKey: true
    },
    nama_kategori: {
      type: DataTypes.STRING(50),
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
