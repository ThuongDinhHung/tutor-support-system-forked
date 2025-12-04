import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmAction({ sessions, setSessions, selectedSession, setSelectedSession, type, onClose, user = null, notifications, setNotifications }) {
  if (!type) return null;
  const navigate = useNavigate();
  const [reason, setReason] = useState(selectedSession?.reason || "");

  let confirmationText = "";
  let isCancel = false;

  if (type === "book") {
    confirmationText =
      "Confirm booking?\nThis action cannot be canceled once confirmed.";
  } else if (type === "cancel") {
    confirmationText = "Are you sure you want to cancel this session?";
    isCancel = true;
  }

  const validateCancel = () => {
    const now = new Date();

    if (selectedSession.date !== now.toDateString()) return null;

    const startMin = toMinutes(selectedSession.startTime);
    const currentMin = now.getHours() * 60 + now.getMinutes();

    if (startMin - currentMin < 120)
      return "Session starts in less than 2 hours. Cannot cancel.";
    
    return null; // valid
  };

  const handleCancelSave = () => {
    if (!selectedSession) return;

    const updated = {
      ...selectedSession,
      state: "Canceled",
      reason,
    };

    // Update the session list
    setSessions((prev) =>
      prev.map((s) => (s.id === selectedSession.id ? updated : s))
    );

    // Send noti
    const newNotiList = {};

    for (const student of selectedSession.students) {
      const newNoti = {
        id: (student.studentID * 1000) + (notifications[student.studentID]?.length || 0) + 1,
        courseName: selectedSession.courseName,
        courseID: selectedSession.courseID,
        tutor: selectedSession.tutor,
        date: new Date().toISOString(),
        title: updated.title,
        description: "The session has been canceled. Reason: " + reason,
        isRead: false,
      };

      newNotiList[student.studentID] = [
        ...(notifications[student.studentID] || []),
        newNoti,
      ];
    }
    setNotifications(prev => ({
      ...prev,
      ...newNotiList
    }));
  };

  const handleRegisterSave = () => {
    if (!selectedSession) return;

    const updated = {
      ...selectedSession,
      students: [...selectedSession.students, {studentName: user.name, studentID: user.id, description: ""}]
    };

    // Update the session list
    setSessions((prev) =>
      prev.map((s) => (s.id === selectedSession.id ? updated : s))
    );
  };
  
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
              if (isCancel) {
                const err = validateCancel();
                if (err) { 
                  alert(err);
                  return;
                }
                handleCancelSave();
                onClose();
              } else {
                handleRegisterSave();
                onClose();
                navigate("/sessions");
              }
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
