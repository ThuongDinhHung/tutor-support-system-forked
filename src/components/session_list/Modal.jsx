import SessionStatusTutor from "./SessionStatusTutor";
import ConfirmAction from "./ConfirmAction";
import CreateEditAction from "./CreateEditAction";
import SessionStatusRegister from "./SessionStatusRegister";

export default function Modal({sessions, setSessions, selectedSession, setSelectedSession, type, onClose, user = null, notifications = null, setNotifications = null}) {
  if (!type && !selectedSession) return null;
  if (type === "record") {
    return (
      <SessionStatusTutor
        setSessions = {setSessions}
        type={type}
        selectedSession={selectedSession}
        onClose={onClose}
      />
    );
  } else if (type === "book" || type === "cancel") {
    return (
      <ConfirmAction
        sessions = {sessions}
        setSessions = {setSessions}
        selectedSession = {selectedSession}
        setSelectedSession = {setSelectedSession}
        type={type}
        onClose={onClose}
        user={user}
        notifications = {notifications}
        setNotifications={setNotifications}
      />
    );
  } else if (type === "create" || type === "edit") {
    return (
      <CreateEditAction
        sessions = {sessions}
        setSessions = {setSessions}
        selectedSession = {selectedSession}
        setSelectedSession = {setSelectedSession}
        type={type}
        onClose={onClose}
        user={user}
        notifications = {notifications}
        setNotifications={setNotifications}
      />
    );
  } else if (type === "register") {
    return (
      <SessionStatusRegister
        sessions = {sessions}
        setSessions = {setSessions}
        selectedSession = {selectedSession}
        setSelectedSession = {setSelectedSession}
        type={type}
        onClose={onClose}
      />
    );
  }
  return null;
}
