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
    await createTable() // create columns table (force)
    await addDataTable() // add data to table
    return sendRes({})
  },
  tambahDataProduk: async (params: {}) => {
    await modelsProduk.create(params)
    return sendRes(true)
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

    const result = await modelsProduk.findAll({ raw: true, ...opt })
    return sendRes(result)
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

    const result = await modelsProduk.findAll({ raw: true, ...opt })
    return sendRes(result)
  },
  editDataProduk: async (params: { data: {}; id: string | number }) => {
    await modelsProduk.update(params.data, {
      where: {
        id: params.id
      }
    })
    return sendRes(true)
  },
  hapusDataProduk: async (params: { id: string | number }) => {
    await modelsProduk.destroy({
      where: {
        id: params.id
      }
    })
    return sendRes(true)
  }
}

export const POST = async (req: Request) => {
  const { method, params } = await req.json()
  try {
    if (method in handle) {
      return await handle[method as keyof typeof handle](params)
    }

    return sendErr({ code: -32600, message: "invalid request method" })
  } catch (err) {
    return sendErr({ code: -32000, message: err })
  }
}

export const GET = (req: Request) => {
  return sendRes("only accept POST with jsonrpc body")
}
