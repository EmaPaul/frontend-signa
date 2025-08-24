import { Table, Plus } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCECEF] flex items-start justify-center p-4 pt-20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#E4344C]">Gestión de Marcas</h1>
          <p className="text-gray-600">Administra y registra las marcas de tu empresa</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">¿Qué deseas hacer?</h2>
            <p className="text-gray-500 text-sm">Selecciona una opción para continuar</p>
          </div>

          <div className="space-y-4">
            <Link href="/panel" className="block">
              <div className="w-full h-14 bg-gradient-to-r from-[#E4344C] to-[#EC6177] hover:from-[#EC6177] hover:to-[#ED7488] text-white rounded-md flex items-center justify-start gap-3 px-4 transition-all cursor-pointer shadow hover:shadow-md">
                <Table className="h-5 w-5" />
                Ver Tabla de Marcas
              </div>
            </Link>

            <Link href="/registro" className="block">
              <div className="w-full h-14 bg-transparent hover:bg-[#E4344C]/5 text-[#E4344C] border border-[#E4344C] hover:border-[#EC6177] rounded-md flex items-center justify-start gap-3 px-4 transition-all cursor-pointer">
                <Plus className="h-5 w-5" />
                Registrar Nueva Marca
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}