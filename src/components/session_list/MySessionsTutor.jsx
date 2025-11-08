import { useState } from "react";
import { TbSettings2, TbMail, TbPlus, TbTrashX } from "react-icons/tb";
import Modal from "./Modal";
import Notification from "../notification/Notification";
import SessionList from "./SessionList";

export default function MySessionsTutor() {
  const [sessions] = useState([
    {
      title: "System modeling review",
      courseName: "Software Engineering",
      courseID: "CO3001",
      tutor: "Lê Minh Hào",
      startTime: "11:00",
      endTime: "15:00",
      date: "2025-10-10",
      state: "Ongoing",
      location: "B6-305",
      maxStudent: 20,
      students: [
        {studentName: "Nguyen Van A", studentID: 2390000, description: ""},
        {studentName: "Nguyen Van B", studentID: 2390001, description: ""},
        {studentName: "Nguyen Van C", studentID: 2390002, description: ""},
        {studentName: "Nguyen Van D", studentID: 2390003, description: ""},
        {studentName: "Nguyen Van E", studentID: 2390004, description: ""},
      ],
      description: "- Revise the theory in the System Modeling chapter.\n- Practice drawing Use Case diagrams and writing scenarios.",
    },
    {
      title: "Transport layer review",
      courseName: "Computer Networks",
      courseID: "CO3093",
      tutor: "Lê Minh Hào",
      startTime: "14:00",
      endTime: "16:00",
      date: "2025-10-11",
      state: "Not started",
      location: "B9-303",
      maxStudent: 20,
      students: [
        {studentName: "Nguyen Van A", studentID: 2390000, description: ""},
        {studentName: "Nguyen Van B", studentID: 2390001, description: ""},
        {studentName: "Nguyen Van C", studentID: 2390002, description: ""},
        {studentName: "Nguyen Van D", studentID: 2390003, description: ""},
        {studentName: "Nguyen Van E", studentID: 2390004, description: ""},
      ],
      description: "",
    },
    {
      title: "Weekly meeting",
      courseName: "Software Engineering",
      courseID: "CO3001",
      tutor: "Lê Minh Hào",
      startTime: "21:00",
      endTime: "22:00",
      date: "2025-10-04",
      state: "Being evaluated",
      link: "https://meet.google.com/hpk-iytb-psz",
      maxStudent: 20,
      students: [
        {studentName: "Nguyen Van A", studentID: 2390000, description: ""},
        {studentName: "Nguyen Van B", studentID: 2390001, description: ""},
        {studentName: "Nguyen Van C", studentID: 2390002, description: ""},
        {studentName: "Nguyen Van D", studentID: 2390003, description: ""},
        {studentName: "Nguyen Van E", studentID: 2390004, description: ""},
      ],
      description: "",
    },
    {
      title: "Weekly meeting",
      courseName: "Software Engineering",
      courseID: "CO3001",
      tutor: "Lê Minh Hào",
      startTime: "21:00",
      endTime: "22:00",
      date: "2025-09-27",
      state: "Finished",
      link: "https://meet.google.com/hpk-iytb-psz",
      maxStudent: 20,
      students: [
        {studentName: "Nguyen Van A", studentID: 2390000, description: ""},
        {studentName: "Nguyen Van B", studentID: 2390001, description: ""},
        {studentName: "Nguyen Van C", studentID: 2390002, description: ""},
        {studentName: "Nguyen Van D", studentID: 2390003, description: ""},
        {studentName: "Nguyen Van E", studentID: 2390004, description: ""},
      ],
      description: "",
    },
    {
      title: "Requirements engineering review",
      courseName: "Software Engineering",
      courseID: "CO3001",
      tutor: "Lê Minh Hào",
      startTime: "11:00",
      endTime: "15:00",
      date: "2025-10-06",
      state: "Canceled",
      location: "B4-302",
      maxStudent: 20,
      students: [
        {studentName: "Nguyen Van A", studentID: 2390000, description: ""},
        {studentName: "Nguyen Van B", studentID: 2390001, description: ""},
        {studentName: "Nguyen Van C", studentID: 2390002, description: ""},
        {studentName: "Nguyen Van D", studentID: 2390003, description: ""},
        {studentName: "Nguyen Van E", studentID: 2390004, description: ""},
      ],
      description: "",
    },
  ]);

  // Add this state for selected session (controls popup)
  const [selectedSession, setSelectedSession] = useState(null);
  const [type, setType] = useState(null);
  const [showNoti, setShowNoti] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-primary-light p-6 rounded-md shadow-sm border border-border-primary mt-10 mb-10 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-primary">My sessions</h2>
        <div className="flex gap-3">
          <button 
            className="p-2 hover:bg-primary/20 rounded-full transition text-primary"
            onClick={(e) => {
              e.stopPropagation();
              setType("create");
              setSelectedSession(null);
            }}
          >
            <TbPlus size={26} />
          </button>
          <button 
            className="p-2 hover:bg-primary/20 rounded-full transition text-primary"
            onClick={() => {setShowNoti(true)}}
          >
            <TbMail size={26} />
          </button>
        </div>
      </div>

      {/* Session List */}
      <SessionList
        sessions={sessions}
        onClose={(session = null) => {
          setType("record");
          setSelectedSession(session);
        }}
      >
        {/* Right-side */}
        <div className="flex gap-2 h-fit">
          <button 
            className="p-1 hover:bg-primary/20 rounded-full transition text-primary"
            onClick={(e) => {
              e.stopPropagation();
              setType("edit");
              setSelectedSession(session);
            }}
          >
            <TbSettings2 size={20} />
          </button>
          <button 
            className="p-1 hover:bg-primary/20 rounded-full transition text-primary"
            onClick={(e) => {
              e.stopPropagation();
              setType("cancel");
              setSelectedSession(session);
            }}
          >
            <TbTrashX size={20} />
          </button>
        </div>
      </SessionList>

      {/* Action */}
      <Modal
        type={type}
        selectedSession={selectedSession}
        onClose={(type = null, session = null) => {
          setType(type);
          setSelectedSession(session);
        }}
      />

      {/* Show Notification Sidebar */}
      <Notification
        showNoti={showNoti}
        onClose={() => setShowNoti(false)}
      />
    </div>
  );
}
