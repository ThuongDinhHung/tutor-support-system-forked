import { useState } from "react";
import { TbMail, TbPlus } from "react-icons/tb";
import Modal from "./Modal";
import Notification from "../notification/Notification";
import SessionList from "./SessionList";

export default function MySessionsTutor({sessions, setSessions, selectedSession, setSelectedSession, user, notifications, setNotifications}) {
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
        sessions = {sessions}
        click = {(session, type = "record") => {
          setType(type);
          setSelectedSession(session);
        }}
        isTutor = {true}
        user = {user}
      />

      {/* Action */}
      <Modal
        sessions = {sessions}
        setSessions = {setSessions}
        selectedSession = {selectedSession}
        setSelectedSession = {setSelectedSession}
        type={type}
        onClose={(type = null, session = null) => {
          setType(type);
          setSelectedSession(session);
        }}
        user = {user}
        notifications = {notifications}
        setNotifications = {setNotifications}
      />

      {/* Show Notification Sidebar */}
      <Notification
        showNoti={showNoti}
        onClose={() => setShowNoti(false)}
        notifications = {notifications}
        setNotifications = {setNotifications}
        user = {user}
      />
    </div>
  );
}
