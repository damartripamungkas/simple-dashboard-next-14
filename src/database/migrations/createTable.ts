import { sequelize } from "../db"
import modelsKategori from "../models/kategori"
import modelsProduk from "../models/produk"
import modelsStatus from "../models/status"
import log from "~/utils/log"

export default async () => {
  try {
    const opt = { force: true }
    const tx = await sequelize.transaction()
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
    await modelsKategori.sync(opt)
    await modelsProduk.sync(opt)
    await modelsStatus.sync(opt)
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
    await tx.commit()
    log.success(`migrations/createTable success`)
  } catch (err) {
    log.error(`migrations/createTable error: ${err}`)
    console.log({ err })
  }
}
