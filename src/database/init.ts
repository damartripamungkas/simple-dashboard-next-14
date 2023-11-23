import getProduk from "~/services/getProduk"
import modelKategori from "./models/kategori"
import modelProduk from "./models/produk"
import modelStatus from "./models/status"

interface IfaceResultObj {
  no: string
  id_produk: string
  nama_produk: string
  kategori: string
  harga: string
  status: string
}

export default async () => {
  const res: Array<IfaceResultObj> = await getProduk()
  const allKategori: any[] = []
  const allStatus: any[] = []
  res.forEach((it) => {
    if (allKategori.includes(it.kategori) === false) allKategori.push(it.kategori)
    if (allStatus.includes(it.status) === false) allStatus.push(it.status)
  })

  await modelKategori.truncate()
  await modelStatus.truncate()
  await modelProduk.truncate()

  await modelKategori.bulkCreate(allKategori.map((it) => ({ nama_kategori: it })))
  await modelStatus.bulkCreate(allStatus.map((it) => ({ nama_status: it })))
  await modelProduk.bulkCreate(
    res.map((it) => {
      const { id_produk, nama_produk, harga, kategori, status } = it
      return {
        id_produk: parseInt(id_produk),
        nama_produk,
        harga: parseInt(harga),
        kategori_id: allKategori.findIndex((it) => it == kategori) + 1,
        status_id: allStatus.findIndex((it) => it == status) + 1
      }
    })
  )

  return true
}
