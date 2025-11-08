import { TbMapPin, TbCalendarMonth, TbClock, TbFileDescription, TbUsers } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import formatSessionTime from "./formatSessionTime";

export default function SessionStatusRegister( {type, selectedSession, onClose} ) {
  if (!type) return null;

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

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="border border-primary text-primary font-medium py-2 px-4 rounded-full hover:bg-primary hover:text-white"
            onClick={() => onClose("book", selectedSession)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
