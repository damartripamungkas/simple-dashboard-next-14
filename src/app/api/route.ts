import { Op } from "sequelize"
import initDb from "~/database/init"
import modelsProduk from "~/database/models/produk"
import modelsStatus from "~/database/models/status"

const sendRes = (...args: any[]) => Response.json({ result: args[0] }, { status: 200 })
const sendErr = (...args: any[]) => Response.json({ error: args[0] }, { status: 200 })
export const POST = async (req: Request) => {
  const { method, params } = await req.json()
  try {
    if (method == "initDb") {
      const result = await initDb()
      return sendRes(result)
    }

    if (method == "tambahDataProduk") {
      await modelsProduk.create(params)
      return sendRes(true)
    }

    if (method == "bacaDataProduk") {
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
    }

    if (method == "bacaDataProdukWithStatus") {
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
    }

    if (method == "editDataProduk") {
      await modelsProduk.update(params.data, {
        where: {
          id: params.id
        }
      })
      return sendRes(true)
    }

    if (method == "hapusDataProduk") {
      await modelsProduk.destroy({
        where: {
          id: params.id
        }
      })
      return sendRes(true)
    }

    return sendErr({ code: -32600, message: "invalid request method" })
  } catch (err) {
    return sendErr({ code: -32000, message: err })
  }
}

export const GET = (req: Request) => {
  return sendRes("only accept POST with jsonrpc body")
}
