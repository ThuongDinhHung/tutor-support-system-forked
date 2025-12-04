import { useState } from "react";
import { TbMapPin, TbCalendarMonth, TbClock, TbUsers } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import formatSessionTime from "./formatSessionTime";

export default function SessionStatusTutor( {setSessions, type, selectedSession, onClose} ) {
  if (!type) return null;

  const [studentNotes, setStudentNotes] = useState(
    selectedSession.students.map(s => s.description || "")
  );

  const handleDescriptionChange = (index, value) => {
    setStudentNotes(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };


  const handleEndSession = () => {
    if (!selectedSession) return;

    const updated = {
      ...selectedSession,
      state: "Finished",
    };

    // Update the session list
    setSessions((prev) =>
      prev.map((s) => (s.id === selectedSession.id ? updated : s))
    );
  };

  const handleSave = () => {
    const updatedSession = {
      ...selectedSession,
      students: selectedSession.students.map((s, i) => ({
        ...s,
        description: studentNotes[i]
      }))
    };

    setSessions(prev =>
      prev.map(s => (s.id === selectedSession.id ? updatedSession : s))
    );
  };

  
  return (
    <div
      className="fixed inset-0 bg-black/25 flex justify-center items-center z-50"
      onClick={onClose} // click outside to close
    >
      <div
        className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close buttons */}
        <div className="flex justify-end">
          <button 
            className="p-1 hover:bg-text-primary/20 rounded-full transition text-text-primary"
            onClick={onClose}
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <h3 className="text-2xl font-semibold mb-2 text-primary">
          {selectedSession.title}
        </h3>

        {/* Info row */}
        <div className="flex items-center gap-5 text-black mb-2">
          <div className="flex items-center gap-1">
            <TbClock /> {formatSessionTime(selectedSession.date, selectedSession.startTime, selectedSession.endTime)}
          </div>
          <div className="flex items-center gap-1">
            <TbMapPin /> {selectedSession.location}
          </div>
          <div className="flex items-center gap-1">
            <TbUsers /> {selectedSession.students.length}/{selectedSession.maxStudent}
          </div>
          <div className="flex items-center gap-1">
            <TbCalendarMonth /> {selectedSession.state}
          </div>
        </div>
        
        {/* Table */}
        <table className="w-full border text-sm text-left text-primary">
          <thead>
            <tr>
              <th className="border px-2 py-2">ID</th>
              <th className="border px-2 py-2 w-60">Full name</th>
              <th className="border px-2 py-2 w-120">Note</th>
            </tr>
          </thead>
          <tbody>
            {selectedSession.students.map((student, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-text-primary">{student.studentID}</td>
                <td className="border px-2 py-1 text-text-primary">{student.studentName}</td>
                <td className="border px-2 py-1 text-text-primary">
                  <input
                    type="text"
                    value={studentNotes[index]}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    className="w-full outline-none"
                    placeholder="Add your instructions or reminders here"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Buttons */}
        {(selectedSession.state === "Ongoing" || selectedSession.state === "Being evaluated") && (<div className="flex justify-end gap-3 mt-5">
          {selectedSession.state === "Being evaluated" && (<button
            className="border border-primary text-primary font-medium py-2 px-4 rounded-full hover:bg-primary hover:text-white"
            onClick={() => {
              handleSave();
              handleEndSession();
              onClose();
            }}
          >
            End session
          </button>)}
          <button
            className="border border-primary text-primary font-medium py-2 px-4 rounded-full hover:bg-primary hover:text-white"
            onClick={() => {
              handleSave();
              onClose();
            }}
          >
            Save
          </button>
        </div>)}
      </div>
    </div>
  )
}
