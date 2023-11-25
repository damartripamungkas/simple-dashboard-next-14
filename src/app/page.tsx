import Navbar from "./components/navbar"
import Toast from "./components/toast"
import { HandleBtn1, HandleBtn2 } from "./components/btnHandle"
import internalApi from "./api/handle"

const Content = async () => {
  const req = await internalApi.handle.bacaDataProdukWithStatus({ nama_status: ["bisa dijual"] })
  const { result: data } = await req.json()
  const keysData = Object.keys(data[0])
  const tableKeysData = keysData.map((it) => {
    const removeSnakeCase = it.replaceAll("_", " ")
    const uppercase1char = removeSnakeCase[0].toUpperCase() + removeSnakeCase.slice(1)
    return uppercase1char
  })

  const tableKeysDataWithType = tableKeysData
    .map((it: any, index: number) => ({
      name: it,
      type: isNaN(data[0][keysData[index]]) ? "text" : "number"
    }))
    .slice(1)

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <p className="text-lg font-semibold">Produk</p>
      <p className="text-sm text-gray-500">
        List produk dari database mysql dengan data API external.
      </p>
      <HandleBtn1 tableKeysDataWithType={tableKeysDataWithType} />

      <div className="card mt-6 shadow rounded-md bg-white">
        <div className="card-body">
          <div className="overflow-auto h-[26rem]">
            <table className="table table-sm">
              <thead>
                <tr>
                  {[
                    ...tableKeysData.map((it: any, index: number) => {
                      return (
                        <th className="text-sm text-gray-500 font-semibold" key={index}>
                          {it}
                        </th>
                      )
                    }),
                    <th className="text-sm text-gray-500 font-semibold" key={keysData.length}>
                      Actions
                    </th>
                  ]}
                </tr>
              </thead>
              <tbody>
                {data.map((it: any, index: number) => {
                  return (
                    <tr key={index} className="hover">
                      {[
                        ...keysData.map((it2: any, index2: number) => (
                          <td className="text-sm text-gray-500" key={index2}>
                            {it[it2]}
                          </td>
                        )),
                        <td key={keysData.length}>
                          <HandleBtn2
                            tableKeysDataWithType={tableKeysDataWithType}
                            tableValuesData={Object.values(it)}
                          />
                        </td>
                      ]}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Toast />
      <Navbar />
      <Content />
    </>
  )
}
