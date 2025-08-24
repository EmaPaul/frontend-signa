import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessModal = ({
  isOpen,
  onClose,
  message = "Registro creado exitosamente",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-sm mx-4">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">¡Éxito!</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-medium transition-colors"
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
