import { handle, sendRes, sendErr } from "./handle"

export const POST = async (req: Request) => {
  const { method, params } = await req.json()
  if (method in handle) {
    return await handle[method as keyof typeof handle](params)
  }

  return sendErr({ code: -32600, message: "invalid request method" })
}

export const GET = (req: Request) => {
  return sendRes("only accept POST with jsonrpc body")
}
