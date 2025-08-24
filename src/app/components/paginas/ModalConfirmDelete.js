import React from 'react';

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
        <p>¿Está seguro de que desea eliminar este registro?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded mr-2"
            onClick={onConfirm}
          >
            Eliminar
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
