import { Op } from "sequelize"
import modelsProduk from "~/database/models/produk"
import modelsStatus from "~/database/models/status"
import createTable from "~/database/migrations/createTable"
import addDataTable from "~/database/seeders/addDataTable"

const sendRes = (...args: any[]) => Response.json({ result: args[0] }, { status: 200 })
const sendErr = (...args: any[]) => Response.json({ error: args[0] }, { status: 200 })
const handle = {
  hello: async (params: {}) => {
    return sendRes("hello world")
  },
  initDb: async (params: {}) => {
    try {
      await createTable() // create columns table (force)
      await addDataTable() // add data to table
      return sendRes(true)
    } catch (err) {
      return sendErr(err)
    }
  },
  tambahDataProduk: async (params: {}) => {
    try {
      await modelsProduk.create(params)
      return sendRes(true)
    } catch (err) {
      return sendErr(err)
    }
  },
  bacaDataProduk: async (params: { id: any[] }) => {
    let opt = {}
    if (params.id.length != 0) {
      opt = {
        where: {
          id: {
            [Op.in]: params.id
          }
        }
      }
    }

    try {
      const result = await modelsProduk.findAll({ raw: true, ...opt })
      return sendRes(result)
    } catch (err) {
      return sendErr(err)
    }
  },
  bacaDataProdukWithStatus: async (params: { nama_status: string[] }) => {
    const opt = {
      include: {
        model: modelsStatus,
        attributes: [],
        where: {
          nama_status: {
            [Op.like]: params.nama_status
          }
        }
      }
    }

    try {
      const result = await modelsProduk.findAll({ raw: true, ...opt })
      return sendRes(result)
    } catch (err) {
      return sendErr(err)
    }
  },
  editDataProduk: async (params: { data: {}; id: string | number }) => {
    try {
      await modelsProduk.update(params.data, {
        where: {
          id: params.id
        }
      })
      return sendRes(true)
    } catch (err) {
      return sendErr(err)
    }
  },
  hapusDataProduk: async (params: { id: string | number }) => {
    try {
      await modelsProduk.destroy({
        where: {
          id: params.id
        }
      })
      return sendRes(true)
    } catch (err) {
      return sendErr(err)
    }
  }
}

export { sendRes, sendErr, handle }
export default { sendRes, sendErr, handle }
