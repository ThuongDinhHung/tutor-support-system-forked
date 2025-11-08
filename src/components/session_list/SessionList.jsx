import formatSessionTime from "./formatSessionTime";

export default function SessionList({sessions, onClose, children}) {

  return (
    <div className="space-y-3">
      {sessions.map((session, index) => (
        <div
          key={index}
          onClick={() => {onClose(session);}}
          className="bg-white border border-border-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="flex justify-between">
            <div>
              {/* Session Title */}
              <h3 className="text-primary font-semibold text-lg">
                {session.title}
              </h3>

              {/* Course info */}
              <p className="text-text-primary text-sm mb-1">
                {session.courseName} ({session.courseID})_{session.tutor}
              </p>

              {/* Time + State */}
              <p className="text-black text-sm mb-1">
                {formatSessionTime(session.date, session.startTime, session.endTime)} - <span className="italic">{session.state}</span>
              </p>

              {/* Location or Link */}
              {session.location && (
                <p className="text-black text-sm">{session.location}</p>
              )}
              {session.link && (
                <a
                  href={session.link}
                  className="text-black text-sm hover:underline block"
                  target="_blank"
                  rel="noreferrer"
                >
                  {session.link}
                </a>
              )}
            </div>

            {/* Right-side */}
            {children}
            {!children && (
              <div className="flex h-fit text-text-primary justify-end">
                {session.students.length}/{session.maxStudent}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
