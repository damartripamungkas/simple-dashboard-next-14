"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { FiAlignCenter } from "react-icons/fi"
import Modal from "./modal"

const requestRpc = async (method: string, params: object) => {
  const run = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ method, params })
  })

  const res = await run.json()
  if (res.error !== undefined) {
    throw res.error
  }

  if (res.result !== undefined) {
    return res.result
  }
}

const renderToast = async (promiseRes: Promise<any>) => {
  await toast.promise(promiseRes, {
    pending: "Pending Request",
    success: "Success",
    error: "Failed"
  })
}

const requestEditData = async (value: any[], id: number | string) => {
  const run = requestRpc("editDataProduk", {
    id,
    data: {
      id_produk: value[0],
      nama_produk: value[1],
      harga: value[2],
      status_id: value[3],
      kategori_id: value[4]
    }
  })
  await renderToast(run)
}

const requestHapusData = async (id: number | string) => {
  const run = requestRpc("hapusDataProduk", { id })
  await renderToast(run)
}

const requestTambahData = async (value: any[]) => {
  const run = requestRpc("tambahDataProduk", {
    id_produk: value[0],
    nama_produk: value[1],
    harga: value[2],
    status_id: value[3],
    kategori_id: value[4]
  })
  await renderToast(run)
}

const requestInitDb = async () => {
  const run = requestRpc("initDb", {})
  await renderToast(run)
}

export function HandleBtn1(param: { tableKeysDataWithType: any[] }) {
  const { tableKeysDataWithType } = param
  const [isMutateBtn1, setMutateBtn1] = useState(false)
  const [isModalOpen1, setModalOpen1] = useState(false)
  const [valueModal1, setValueModal1] = useState(tableKeysDataWithType)
  const router = useRouter()

  return (
    <>
      {isModalOpen1 ? (
        <Modal
          cbStatusModal={setModalOpen1}
          bodyContent={
            <div className="card card-compact">
              <div className="card-body">
                <div className="gap-3 grid grid-cols-3">
                  {tableKeysDataWithType.map((it: any, index: number) => (
                    <div key={index} className="form-control">
                      <label className="label">
                        <span className="label-text">{it.name}</span>
                      </label>
                      <input
                        type={it.type}
                        className="input input-sm input-bordered w-full rounded-none"
                        onChange={(e) => {
                          valueModal1[index].value = e.target.value
                          setValueModal1(valueModal1)
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 card-actions justify-end">
                  <button
                    className="btn rounded-none btn-sm shadow-sm text-gray-500"
                    onClick={() => {
                      const value = valueModal1.map((it) => it.value)
                      requestTambahData(value).finally(() => {
                        setModalOpen1(false)
                        router.refresh()
                      })
                    }}
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
          }
        />
      ) : undefined}

      <div className="mt-5 space-x-3 flex justify-items-start">
        <button
          className="btn rounded-none shadow btn-sm bg-white text-gray-500"
          disabled={isMutateBtn1}
          onClick={() => {
            setMutateBtn1(true)
            requestInitDb().finally(() => {
              setMutateBtn1(false)
              router.refresh()
            })
          }}
        >
          Initdb
        </button>
        <button
          className="btn rounded-none shadow btn-sm bg-white text-gray-500"
          onClick={() => setModalOpen1(true)}
        >
          Tambah
        </button>
      </div>
    </>
  )
}

export function HandleBtn2(param: { tableKeysDataWithType: any[]; tableValuesData: any[] }) {
  const { tableKeysDataWithType, tableValuesData } = param
  const removeIdTableValuesData = tableValuesData.slice(1)
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState("")

  const closeDropdown = () => {
    const elem: any = document.activeElement
    if (elem) elem?.blur()
  }

  return (
    <>
      {isModalOpen == "edit" || isModalOpen == "delete" ? (
        <Modal
          cbStatusModal={setModalOpen}
          bodyContent={
            <div className="card card-compact">
              <div className="card-body">
                <div className="gap-3 grid grid-cols-3">
                  {tableKeysDataWithType.map((it: any, index: number) => (
                    <div key={index} className="form-control">
                      <label className="label">
                        <span className="label-text">{it.name}</span>
                      </label>
                      <input
                        type={it.type}
                        className="input input-sm input-bordered w-full rounded-none"
                        defaultValue={removeIdTableValuesData[index]}
                        disabled={
                          isModalOpen == "edit" ? false : isModalOpen == "delete" ? true : undefined
                        }
                        onChange={(e) => {
                          removeIdTableValuesData[index] = e.target.value
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 card-actions justify-end">
                  <button
                    className={
                      isModalOpen == "edit"
                        ? "btn rounded-none btn-sm shadow-sm text-gray-500"
                        : isModalOpen == "delete"
                        ? "btn btn-error text-white rounded-none btn-sm shadow-sm"
                        : undefined
                    }
                    onClick={async () => {
                      if (isModalOpen == "edit") {
                        await requestEditData(removeIdTableValuesData, tableValuesData[0])
                      }
                      if (isModalOpen == "delete") {
                        await requestHapusData(tableValuesData[0])
                      }
                      setModalOpen("")
                      router.refresh()
                    }}
                  >
                    {isModalOpen == "edit"
                      ? "Request"
                      : isModalOpen == "delete"
                      ? "Delete"
                      : undefined}
                  </button>
                </div>
              </div>
            </div>
          }
        />
      ) : undefined}

      <div
        className="dropdown shadow-sm dropdown-left blur-0"
        onClick={() => {
          if (dropdownOpen) {
            closeDropdown()
            setDropdownOpen(false)
          } else {
            setDropdownOpen(true)
          }
        }}
      >
        <label tabIndex={0} className="btn btn-xs btn-circle">
          <FiAlignCenter />
        </label>
        <ul
          tabIndex={1}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li
            onClick={() => {
              closeDropdown()
              setModalOpen("edit")
            }}
          >
            <p>Edit</p>
          </li>
          <li
            onClick={() => {
              closeDropdown()
              setModalOpen("delete")
            }}
          >
            <p>Hapus</p>
          </li>
        </ul>
      </div>
    </>
  )
}
