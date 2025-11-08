import { TbMapPin, TbCalendarMonth, TbClock, TbFileDescription, TbUsers } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import formatSessionTime from "./formatSessionTime";

export default function SessionStatusTutor( {studentID, selectedSession, onClose} ) {
  if (!selectedSession) return null;

  const student = selectedSession.students.filter(s => s.studentID === studentID)[0];

  return (
    <div
      className="fixed inset-0 bg-black/25 flex justify-center items-center z-50"
      onClick={onClose} // click outside to close
    >
      <div
        className="w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl animate-fadeIn"
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
            <TbMapPin /> 
            {selectedSession.location && (<p>{selectedSession.location}</p>)}
            {selectedSession.link && (<a href={selectedSession.link} target="_blank" rel="noreferrer" className="hover:underline"> {"Online"}</a>)}
          </div>
          <div className="flex items-center gap-1">
            <TbUsers /> {selectedSession.students.length}/{selectedSession.maxStudent}
          </div>
          <div className="flex items-center gap-1">
            <TbCalendarMonth /> {selectedSession.state}
          </div>
        </div>

        {/* Description */}
        {selectedSession.description && (
          <div className="flex items-start gap-1 text-black whitespace-pre-line mb-2">
            <TbFileDescription className="mt-1"/> {selectedSession.description}
          </div>
        )}

        {/* Note */}
        <div className="flex items-center gap-2 mb-3 text-text-primary w-full border rounded-md p-2 mb-2 border-text-primary">
          {student.description? student.description : "The tutor hasn’t added any message yet."}
        </div>
      </div>
    </div>
  )
}
