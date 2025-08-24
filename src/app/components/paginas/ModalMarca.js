"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import * as marcasService from "../Servicios/marcas.servicios";  
import { useForm } from "react-hook-form";  

const ModalMarca = ({ isOpen, onClose, marcaId, isEditing = false }) => {  
  const { register, handleSubmit, setValue, watch } = useForm();  
  const [marca, setMarca] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && marcaId) {
      fetchMarcaDetails();
    }
  }, [isOpen, marcaId]);

  const fetchMarcaDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const marcaData = await marcasService.getIdMarcas(marcaId);
      setMarca(marcaData);
      setValue("nombre_marca", marcaData.nombre_marca);
      setValue("titular", marcaData.titular);
      setValue("estado", marcaData.estado ? "true" : "false");
      setValue("descripcion", marcaData.descripcion);
    } catch (err) {
      setError("Error al cargar los detalles de la marca");
      console.error("Error fetching marca details:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const datosActualizados = {
        ...data,
        estado: data.estado === "true"
      };
      await marcasService.updateMarcas(datosActualizados, marcaId);
      onClose("Marca actualizada exitosamente");
    } catch (err) {
      setError("Error al actualizar la marca");
      console.error("Error updating marca:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="bg-red-400 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">{isEditing ? "Editar Marca" : "Detalles de la Marca"}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-gray-600 mt-2">Cargando detalles...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {marca && !loading && (
            <>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la Marca
                    </label>
                    <input
                      {...register("nombre_marca", { required: true })}
                      className="text-gray-900 bg-gray-50 px-3 py-2 rounded w-full border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titular
                    </label>
                    <input
                      {...register("titular", { required: true })}
                      className="text-gray-900 bg-gray-50 px-3 py-2 rounded w-full border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      {...register("estado", { required: true })}
                      className="text-gray-900 bg-gray-50 px-3 py-2 rounded w-full border border-gray-300"
                    >
                      <option value="true">Activo</option>
                      <option value="false">No Activo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      {...register("descripcion")}
                      className="text-gray-900 bg-gray-50 px-3 py-2 rounded w-full border border-gray-300"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la Marca
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
                      {marca.nombre_marca || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titular
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
                      {marca.titular || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <span
                      className={`px-3 py-2 rounded text-sm font-medium ${
                        marca.estado === true
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {marca.estado ? "Activo" : "No Activo"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded whitespace-pre-wrap">
                      {marca.descripcion || "N/A"}
                    </p>
                  </div>

                  {marca.fechaCreacion && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Creación
                      </label>
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
                        {new Date(marca.fechaCreacion).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>


        {!isEditing && (
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Aceptar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalMarca;