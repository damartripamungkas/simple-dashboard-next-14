import { sequelize } from "../db"
import getProduk from "~/services/getProduk"
import modelsKategori from "../models/kategori"
import modelsProduk from "../models/produk"
import modelsStatus from "../models/status"
import log from "~/utils/log"

export default async () => {
  const res = await getProduk()
  const allKategori: any[] = []
  const allStatus: any[] = []
  res.forEach((it) => {
    if (allKategori.includes(it.kategori) === false) allKategori.push(it.kategori)
    if (allStatus.includes(it.status) === false) allStatus.push(it.status)
  })

  const val1 = allKategori.map((it) => ({ nama_kategori: it }))
  const val2 = allStatus.map((it) => ({ nama_status: it }))
  const val3 = res.map((it) => {
    const { id_produk, nama_produk, harga, kategori, status } = it
    return {
      id_produk: parseInt(id_produk),
      nama_produk,
      harga: parseInt(harga),
      kategori_id: allKategori.findIndex((it) => it == kategori) + 1,
      status_id: allStatus.findIndex((it) => it == status) + 1
    }
  })

  //   modelsProduk.belongsTo()

  const tx = await sequelize.transaction()
  await modelsKategori.bulkCreate(val1)
  await modelsProduk.bulkCreate(val3)
  await modelsStatus.bulkCreate(val2)
  await tx.commit()
  log.success(`seeders/addDataTable success`)

  //   modelsProduk.belongsTo(modelsStatus, {
  //     foreignKey: "status_id"
  //     // onDelete: "SET NULL",
  //     // onUpdate: "CASCADE"
  //   }) // for INNER sql
}
