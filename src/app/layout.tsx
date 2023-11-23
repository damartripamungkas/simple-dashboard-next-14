import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Simple Dashboard",
  description: "Simple dashboard with next.js, tailwind, daisyui, sequelize, mysql",
  authors: { name: "damartripamungkas", url: "https://github.com/damartripamungkas" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="bg-gray-50">
      <body>{children}</body>
    </html>
  )
}
