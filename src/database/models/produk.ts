import { sequelize, DataTypes } from "../db"
import modelsStatus from "./status"

const define = sequelize.define(
  "produk",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_produk: {
      type: DataTypes.INTEGER,
      unique: true
    },
    nama_produk: DataTypes.STRING,
    harga: DataTypes.BIGINT,
    kategori_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  },
  {
    hooks: {
      beforeCreate: (attr, opt) => {
        // empty
      }
    }
  }
)

define.belongsTo(modelsStatus, { foreignKey: "status_id" })

export default define
