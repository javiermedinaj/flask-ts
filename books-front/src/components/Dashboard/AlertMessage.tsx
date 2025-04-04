import React from "react";
import { X } from "lucide-react";

interface AlertMessageProps {
  message: {
    text: string;
    type: "success" | "error";
  };
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, onClose }) => {
  return (
    <div 
      className={`mb-6 p-4 backdrop-blur-sm rounded-lg border flex justify-between items-center
        ${message.type === "success" 
          ? "bg-green-900/20 border-green-500/30 text-green-300" 
          : "bg-red-900/20 border-red-500/30 text-red-300"}`}
    >
      <p>{message.text}</p>
      <button 
        onClick={onClose}
        className="text-white/70 hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AlertMessage;