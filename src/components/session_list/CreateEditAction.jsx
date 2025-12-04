import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbMapPin, TbCalendarMonth, TbClock, TbFileDescription, TbUsers } from "react-icons/tb";

export default function CreateEditAction({ sessions, setSessions, selectedSession, setSelectedSession, type, onClose, user, notifications, setNotifications }) {
  if (!type) return null;
  const isEdit = type === "edit";
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // default hour options (00, 15, 30, 45)
  const timeOptions = ["00", "15", "30", "45"];

  const getClosestTime = () => {
    const now = new Date();
    const mins = now.getMinutes();
    const rounded = timeOptions.find((m) => mins <= parseInt(m)) || "00";
    const hour = now.getHours();
    return { hour, minute: rounded };
  };

  const closest = getClosestTime();

  const [title, setTitle] = useState(isEdit ? selectedSession?.title || "" : "");
  const [date, setDate] = useState(
    isEdit
      ? selectedSession?.date || tomorrow.toISOString().split("T")[0]
      : tomorrow.toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState(
    isEdit ? selectedSession?.startTime || `${closest.hour}:00` : `${closest.hour}:00`
  );
  const [endTime, setEndTime] = useState(
    isEdit
      ? selectedSession?.endTime || `${(closest.hour + 1) % 24}:00`
      : `${(closest.hour + 1) % 24}:00`
  );
  const [location, setLocation] = useState(isEdit ? selectedSession?.location || "" : "");
  const [maxStudents, setMaxStudents] = useState(isEdit ? selectedSession?.maxStudent || "" : "");
  const [description, setDescription] = useState(isEdit ? selectedSession?.description || "" : "");

  const toMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  const validateSession = (isEdit) => {
    // 0. Compulsory field
    if (!title) return "Title must be filled."
    if (!location) return "Location must be filled."
    if (!maxStudents) return "Number of student must be filled."

    const startMin = toMinutes(startTime);
    const endMin = toMinutes(endTime);

    // 1. Some time requirement
    if (startMin >= endMin)
      return "Start time must be earlier than end time.";
    if (endMin - startMin < 60)
      return "Session duration must be at least 1 hour.";
    if (startMin < 300)
      return "Session can not start before 5AM.";

    const today = new Date();
    const selectedDate = new Date(date);

    // 2. Must be after now + 2 hours && Date must not be in the past
    if (selectedDate.toDateString() === today.toDateString()) {
      const nowPlus2 = new Date();
      nowPlus2.setHours(nowPlus2.getHours() + 2);

      const sessionStart = new Date(`${date}T${startTime}`);

      if (sessionStart < nowPlus2)
        return isEdit
        ? "An edited session must start at least 2 hours from now."
        : "A new session must start at least 2 hours from now.";
    }
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return "The selected date is in the past.";
    }

    // 3. No overlap with tutor’s existing sessions
    const tutorSessions = sessions.filter(s => s.tutorID === user.id);

    for (const s of tutorSessions) {
      // Skip comparing with itself during edit or it was the canceled session
      if ((isEdit && s.id === selectedSession.id) || s.state === "Canceled") continue;

      if (s.date !== date) continue; // different day = OK

      const sStart = toMinutes(s.startTime);
      const sEnd = toMinutes(s.endTime);

      const overlap =
        (startMin < sEnd && endMin > sStart); // classic overlap condition

      if (overlap) {
        return `This session overlaps with another session: "${s.title}" (${s.startTime}–${s.endTime}).`;
      }
    }

    return null; // valid!
  };

  const handleEditSave = () => {
    if (!selectedSession) return;

    const updated = {
      ...selectedSession,
      title,
      date,
      startTime,
      endTime,
      location,
      maxStudent: parseInt(maxStudents) || 0,
      description,
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
        description: "The tutor has edited the session.",
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

  const handleCreateSave = () => {
    // Build new session object
    const newSession = {
      id: sessions.length + 1,                     // generate unique id
      title,
      date,
      startTime,
      endTime,
      location,
      maxStudent: parseInt(maxStudents) || 0,
      description,
      courseName: "Software Engineering",
      courseID: "CO3001",
      tutorID: user.id,
      tutor: user.name,
      state: "Not started",
      students: [],
      reason: "",
    };

    // Add to session list
    setSessions((prev) => [...prev, newSession]);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/25 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
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

        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title"
          className="w-full border-b-2 border-primary focus:outline-none text-2xl font-semibold mb-2 text-text-primary"
        />

        {/* Date and Time */}
        <div className="flex items-center gap-2 mb-3 text-text-primary">
          <TbClock/>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-md px-2 py-1 mr-5"
          />
          <input
            type="time"
            step="3600" // 60 min
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
          <span>–</span>
          <input
            type="time"
            step="3600"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3 text-text-primary">
          <TbMapPin/>
          <input
            type="text"
            placeholder="Add location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
        </div>

        {/* Max students */}
        <div className="flex items-center gap-2 mb-3 text-text-primary">
          <TbUsers/>
          <input
            type="number"
            placeholder="Set max students"
            value={maxStudents}
            onChange={(e) => setMaxStudents(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 mb-3 text-text-primary">
          <TbFileDescription className="mt-1"/>
          <textarea
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2 mb-2"
            rows={3}
          ></textarea>
        </div>
        

        {/* Confirm */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              const err = validateSession(isEdit);
              if (err) { 
                alert(err);
                return;
              }

              if (isEdit) handleEditSave();
              else handleCreateSave();

              onClose();
            }}
            className="px-5 py-1.5 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
