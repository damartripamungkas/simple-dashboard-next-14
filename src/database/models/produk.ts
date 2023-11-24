import { sequelize, DataTypes } from "../db"
import modelsKategori from "./kategori"
import modelsStatus from "./status"

const define = sequelize.define(
  "produk",
  {
    id: {
      type: DataTypes.INTEGER({ length: 50 }),
      autoIncrement: true,
      primaryKey: true
    },
    id_produk: {
      type: DataTypes.INTEGER({ length: 10 }),
      unique: true
    },
    nama_produk: DataTypes.STRING(100),
    harga: DataTypes.BIGINT({ length: 50 })
  },
  {
    hooks: {
      beforeBulkCreate: (attr, opt) => {
        // empty
      }
    }
  }
)

define.belongsTo(modelsStatus, {
  foreignKey: "status_id",
  targetKey: "id_status",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

define.belongsTo(modelsKategori, {
  foreignKey: "kategori_id",
  targetKey: "id_kategori",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

export default define
