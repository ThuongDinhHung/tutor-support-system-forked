import { useState, useEffect } from "react";
import { sessionData } from "./sessions"
import { notificationData } from "../notification/notificationData";
import MySessionsTutor from "./MySessionsTutor";
import MySessionsStudent from "./MySessionsStudent";
import RegisterPage from "./RegisterPage";

export default function MySessions({isTutor, isRegister}) {
  const student = {name: "Nguyen Van B", id: 2390001};
  const tutor = {name: "Lê Minh Hào", id: 2310846};
  const [sessions, setSessions] = useState(sessionData);
  const [notifications, setNotifications] = useState(notificationData);
  const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
    const interval = setInterval(() => {
        checkForReminders();
        checkForStart();
        checkForEnd();
      }, 60 * 1000); // runs every 1 minute
  
      return () => clearInterval(interval);
    }, [sessions, notifications]);
  
  const checkForReminders = () => {
    const now = new Date();

    setSessions(prevSessions =>
      prevSessions.map(session => {
        if (session.hasReminderSent || session.state !== "Not started") return session;

        const start = new Date(`${session.date} ${session.startTime}`);
        const diffMs = start - now;
        const diffMinutes = diffMs / 1000 / 60;

        if (diffMinutes <= 60) {

          // Notify tutor 
          if (session.tutorID) {
            sendReminder(session.tutorID, session);
          }

          // Notify students
          session.students.forEach(student => {
            sendReminder(student.studentID, session);
          });

          return { ...session, hasReminderSent: true };
        }

        return session;
      })
    );
  };

  const sendReminder = (userID, session) => {
    const newNoti = {
      id: (userID.studentID * 1000) + (notifications[userID.studentID]?.length || 0) + 1,
      courseName: session.courseName,
      courseID: session.courseID,
      tutor: session.tutor,
      title: session.title,
      description: "Your session starts in 1 hour.",
      date: new Date().toISOString(),
      isRead: false,
    };

    setNotifications(prev => ({
      ...prev,
      [userID]: [...(prev[userID] || []), newNoti],
    }));
  };

  const checkForStart = () => {
    const now = new Date();

    setSessions(prevSessions =>
      prevSessions.map(session => {
        if (session.state !== "Not started") return session;
        const start = new Date(`${session.date} ${session.startTime}`);
        const diffMs = start - now;
        const diffMinutes = diffMs / 1000 / 60;

        if (diffMinutes <= 0) {
          return { ...session, state: "Ongoing" };
        }

        return session;
      })
    );
  };

  const checkForEnd = () => {
    const now = new Date();

    setSessions(prevSessions =>
      prevSessions.map(session => {
        if (session.state !== "Ongoing") return session;
        const start = new Date(`${session.date} ${session.endTime}`);
        const diffMs = start - now;
        const diffMinutes = diffMs / 1000 / 60;

        if (diffMinutes <= 0) {
          return { ...session, state: "Being evaluated" };
        }
        
        return session;
      })
    );
  };

  if (isRegister) {
    return (<RegisterPage
              sessions = {sessions}
              setSessions = {setSessions}
              selectedSession = {selectedSession}
              setSelectedSession = {setSelectedSession}
              user = {student}
            />);
  } else {
    if (!isTutor) {
      return (<MySessionsStudent
                sessions = {sessions}
                setSessions = {setSessions}
                selectedSession = {selectedSession}
                setSelectedSession = {setSelectedSession}
                user = {student}
                notifications = {notifications}
                setNotifications = {setNotifications}
              />);
    } else {
      return (<MySessionsTutor
                sessions = {sessions}
                setSessions = {setSessions}
                selectedSession = {selectedSession}
                setSelectedSession = {setSelectedSession}
                user = {tutor}
                notifications = {notifications}
                setNotifications = {setNotifications}
              />);
    }
  }
} 