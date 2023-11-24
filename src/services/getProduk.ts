/**
 * this is my custom API service product, you must be edit manualy and custom with your self
 */
import { createHash } from "crypto"
import dayjs from "dayjs"

interface IfaceResultObj {
  no: string
  id_produk: string
  nama_produk: string
  kategori: string
  harga: string
  status: string
}

const credentialRequest = { username: "", password: "" }
const request = async () => {
  const formData = new FormData()
  credentialRequest.password = createHash("md5")
    .update(`bisacoding-${dayjs().format("DD-MM-YY")}`)
    .digest("hex")

  formData.append("username", credentialRequest.username)
  formData.append("password", credentialRequest.password)
  return await fetch(process.env.SERVICE_URL_PRODUCT, {
    method: "POST",
    body: formData,
    cache: "no-cache"
  })
}

const requestAction = async () => {
  let togle = true
  while (togle) {
    const request1 = await request()
    const data = await request1.json()

    if (data.error == 1) {
      const username: any = request1.headers.get("x-credentials-username")
      credentialRequest.username = username.split(" ")[0]
    } else if (data.data != undefined) {
      togle = false
      const res = data.data
      return res
    }
  }
}

export default async (): Promise<Array<IfaceResultObj>> => {
  return await requestAction()
}
