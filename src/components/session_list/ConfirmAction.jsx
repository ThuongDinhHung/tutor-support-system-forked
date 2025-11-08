import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmAction({ type, selectedSession, onClose }) {
  if (!type) return null;
  const navigate = useNavigate();
  const [reason, setReason] = useState("");

  let confirmationText = "";
  let isCancel = false;

  if (type === "book") {
    confirmationText =
      "Confirm booking?\nThis action cannot be canceled once confirmed.";
  } else if (type === "cancel") {
    confirmationText = "Are you sure you want to cancel this session?";
    isCancel = true;
  }
  
  return (
    <div 
      className="fixed inset-0 bg-black/25 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Input reason */}
        {isCancel && (
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide a reason for cancelling the session"
            className="w-full border border-text-primary rounded-md p-2 mb-2 text-sm text-left text-text-primary"
            rows={3}
          ></textarea>
        )}

        {/* Confirmation text */}
        {confirmationText && (
          <p className="text-black font-medium mb-2 whitespace-pre-line">
            {confirmationText}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              onClose;
              {!isCancel && navigate("/sessions")}
            }}
            className="border border-primary text-primary font-medium py-2 px-4 rounded-full hover:bg-primary hover:text-white"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="border border-text-primary text-text-primary font-medium py-2 px-4 rounded-full hover:bg-primary hover:text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
