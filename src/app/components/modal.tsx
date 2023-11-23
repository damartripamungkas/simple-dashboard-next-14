"use client"
import { useState } from "react"

export default function Modal({ cbStatusModal, bodyContent }: any) {
  const [modal, setModal] = useState(true)
  const handleChange = () => {
    cbStatusModal(!modal)
    setModal(!modal)
  }

  return (
    <div>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box rounded-md max-w-5xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleChange}
          >
            ✕
          </button>
          {bodyContent}
        </div>
      </div>
    </div>
  )
}
