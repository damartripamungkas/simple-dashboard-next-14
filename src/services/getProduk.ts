/**
 * this is my custom API service product, you must be edit manualy and custom with your self
 */
import { createHash } from "crypto"
import dayjs from "dayjs"

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
    body: formData
  })
}

export default async () => {
  let togle = true
  while (togle) {
    const request1 = await request()
    const data = await request1.json()

    if (data.error == 1) {
      const username: any = request1.headers.get("x-credentials-username")
      credentialRequest.username = username.slice(0, 22)
    } else if (data.data != undefined) {
      togle = false
      return data.data
    }
  }
}
