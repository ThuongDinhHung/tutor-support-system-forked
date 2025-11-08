import MySessionsTutor from "./MySessionsTutor";
import MySessionsStudent from "./MySessionsStudent";

export default function MySessions() {
  let isTutor = false;
  if (!isTutor) {
    return (<MySessionsStudent/>);
  }
  return (<MySessionsTutor/>);
} 