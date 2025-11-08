import SessionStatusTutor from "./SessionStatusTutor";
import ConfirmAction from "./ConfirmAction";
import CreateEditAction from "./CreateEditAction";
import SessionStatusRegister from "./SessionStatusRegister";

export default function Modal({ type, selectedSession, onClose }) {
  if (!type && !selectedSession) return null;
  if (type === "record") {
    return (
      <SessionStatusTutor
        type={type}
        selectedSession={selectedSession}
        onClose={onClose}
      />
    );
  } else if (type === "book" || type === "cancel") {
    return (
      <ConfirmAction
        type={type}
        selectedSession={selectedSession}
        onClose={onClose}
      />
    );
  } else if (type === "create" || type === "edit") {
    return (
      <CreateEditAction
        type={type}
        selectedSession={selectedSession}
        onClose={onClose}
      />
    );
  } else if (type === "register") {
    return (
      <SessionStatusRegister
        type={type}
        selectedSession={selectedSession}
        onClose={onClose}
      />
    );
  }
  return null;
}
