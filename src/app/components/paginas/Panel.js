"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, RefreshCw, Eye, X } from "lucide-react";
import * as marcasService from "../Servicios/marcas.servicios";
import ModalMarca from "./ModalMarca";
import ModalConfirmDelete from "./ModalConfirmDelete";

export default function Panel() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [marcaToDelete, setMarcaToDelete] = useState(null);

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    setLoading(true);
    setError(null);
    try {
      const marcasData = await marcasService.GetMarcas();
      console.log("Fetched marcas data:", marcasData);
      console.log(marcasData)
      setMarcas(marcasData);
    } catch (err) {
      setError("Error al cargar las marcas");
      console.error("Error fetching marcas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMarca = (id) => {
    setMarcaToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMarca = async () => {
    try {
      await marcasService.deleteMarcas(marcaToDelete);
      setMarcas(marcas.filter((marca) => marca.id !== marcaToDelete));
      setError(null);
      setSuccess("Marca eliminada exitosamente");
      setIsDeleteModalOpen(false);
      setMarcaToDelete(null);
      fetchMarcas();
    } catch (err) {
      setError("Error al eliminar la marca");
      console.error("Error deleting marca:", err);
      setIsDeleteModalOpen(false);
      setMarcaToDelete(null);
    }
  };

  const cancelDeleteMarca = () => {
    setIsDeleteModalOpen(false);
    setMarcaToDelete(null);
  };

  const handleViewMarca = (marca) => {
    setSelectedMarca({...marca, isEditing: false});
    setIsModalOpen(true);
  };

  const handleEditMarca = (marca) => {
    setSelectedMarca({...marca, isEditing: true});
    setIsModalOpen(true);
  };

  const handleCloseModal = (successMessage = null) => {
    setIsModalOpen(false);
    setSelectedMarca(null);
    if (typeof successMessage === 'string') {
      setSuccess(successMessage);
    }
    fetchMarcas();
  };

  const handleRefresh = () => {
    fetchMarcas();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCECEF] p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Cargando marcas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCECEF] p-4">
      <ModalMarca
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        marcaId={selectedMarca?.id}
        isEditing={selectedMarca?.isEditing}
      />
      <div className="max-w-6xl mx-auto"> 
        <ModalConfirmDelete
          isOpen={isDeleteModalOpen}
          onClose={cancelDeleteMarca}
          onConfirm={confirmDeleteMarca}
        />
        
        {/* Header Section */}
        <div className="bg-red-400 text-white px-4 md:px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-base md:text-lg font-semibold">Servicios/Registro de Marca</h1>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 md:px-4 md:py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden md:inline">Actualizar</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={fetchMarcas}
              className="ml-4 text-red-800 underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{success}</span>
            <button
              onClick={() => setSuccess(null)}
              className="text-green-700 hover:text-green-900 ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Desktop View */}
        <div className="hidden md:block bg-white border border-gray-200 rounded-b-lg shadow-sm">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Marca</div>
            <div className="col-span-3">Titular</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-3">Acciones</div>
          </div>

          <div className="divide-y divide-gray-200">
            {marcas.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                {error
                  ? "Error al cargar las marcas"
                  : "No hay marcas registradas"}
              </div>
            ) : (
              marcas.map((marca, index) => (
                <div
                  key={marca.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50"
                >
                  <div className="col-span-1 text-gray-600">#{index + 1}</div>
                  <div className="col-span-3 font-medium">
                    {typeof marca.nombre_marca === 'string' ? marca.nombre_marca : "N/A"}
                  </div>
                  <div className="col-span-3">
                    {typeof marca.titular === 'string' ? marca.titular : "N/A"}
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        typeof marca.estado === 'boolean' ? (marca.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {typeof marca.estado === 'boolean' ? (marca.estado ? "Activo" : "No Activo") : "N/A"}
                    </span>
                  </div>
                  <div className="col-span-3 flex gap-2">
                    <button
                      onClick={() => handleViewMarca(marca)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" /> Ver
                    </button>
                    <span className="text-gray-400">/</span>
                    <button
                      onClick={() => handleEditMarca(marca)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" /> Editar
                    </button>
                    <span className="text-gray-400">/</span>
                    <button
                      onClick={() => handleDeleteMarca(marca.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden mt-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-medium text-gray-700">Lista de Marcas</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {marcas.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  {error
                    ? "Error al cargar las marcas"
                    : "No hay marcas registradas"}
                </div>
              ) : (
                marcas.map((marca, index) => (
                  <div key={marca.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewMarca(marca)}
                          className="text-blue-600 p-1 rounded-full hover:bg-blue-50"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditMarca(marca)}
                          className="text-green-600 p-1 rounded-full hover:bg-green-50"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMarca(marca.id)}
                          className="text-red-600 p-1 rounded-full hover:bg-red-50"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Marca:</span>
                        <p className="text-sm font-medium bg-gray-50 p-2 rounded">
                          {typeof marca.nombre_marca === 'string' ? marca.nombre_marca : "N/A"}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Titular:</span>
                        <p className="text-sm bg-gray-50 p-2 rounded">
                          {typeof marca.titular === 'string' ? marca.titular : "N/A"}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Estado:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            typeof marca.estado === 'boolean' ? 
                            (marca.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") : 
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {typeof marca.estado === 'boolean' ? 
                            (marca.estado ? "Activo" : "No Activo") : 
                            "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}