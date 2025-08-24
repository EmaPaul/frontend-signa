'use client'

import React, { useState } from 'react'
import * as marcasService from '../Servicios/marcas.servicios'
import SuccessModal from './SuccessModal'

export default function Registro() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre_marca: '',
    descripcion: '',
    titular: '',
    estado: true
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    
    try {
      if (!formData.nombre_marca || !formData.titular) {
        throw new Error('Por favor complete todos los campos requeridos')
      }

      const result = await marcasService.addMarcas(formData)
      
      if (result.success || result.id) {
        setShowSuccessModal(true)
        setFormData({
          nombre_marca: '',
          descripcion: '',
          titular: '',
          estado: true
        })
        setCurrentStep(1)
      } else {
        throw new Error('Error al registrar la marca')
      }
    } catch (err) {
      setError(err.message || 'Error al registrar la marca')
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (currentStep === 3) {
      handleSubmit()
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="nombre_marca" className="block text-sm text-gray-700 mb-2">
                Marca a Registrar *
              </label>
              <input
                type="text"
                id="nombre_marca"
                value={formData.nombre_marca}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="descripcion" className="block text-sm text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describe tu marca..."
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="titular" className="block text-sm text-gray-700 mb-2">
                Nombre del Titular *
              </label>
              <input
                type="text"
                id="titular"
                value={formData.titular}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Nombre de la Marca"
      case 2:
        return "Descripción"
      case 3:
        return "Titular"
      default:
        return ""
    }
  }

  return (
    <>
      <div className="min-h-screen bg-[#FCECEF] flex items-start justify-center pt-16 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm overflow-hidden">
          
          <div className="bg-red-400 text-white px-4 py-3">
            <h1 className="text-sm font-medium">Servicios/Registro de Marca</h1>
          </div>


          <div className="p-6">

            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">

                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= 1 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                </div>


                <div className={`w-8 h-px ${currentStep > 1 ? "bg-red-500" : "bg-gray-300"}`}></div>

                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= 2 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                </div>


                <div className={`w-8 h-px ${currentStep > 2 ? "bg-red-500" : "bg-gray-300"}`}></div>


                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= 3 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                </div>
              </div>
            </div>


            <div className="mb-8">
              <h2 className="text-center text-gray-800 font-medium mb-6 italic">{getStepTitle()}</h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {renderFormContent()}
            </div>

            <div className="flex justify-center space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-2 text-sm font-medium transition-colors"
                >
                  Atrás
                </button>
              )}
              <button
                onClick={handleContinue}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 text-sm font-medium transition-colors"
              >
                {currentStep === 3 ? "Crear" : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Marca registrada exitosamente!"
      />
    </>
  )
}