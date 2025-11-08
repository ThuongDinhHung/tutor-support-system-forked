export default function formatSessionTime(dateStr, start, end) {
  // Parse the date
  const date = new Date(dateStr);

  // Format the date part: "October 10th, 2025"
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Add the ordinal suffix (st, nd, rd, th)
  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  const dayWithSuffix = `${day}${getOrdinal(day)}`;

  // --- format time ---
  const parseTime = (timeStr) => {
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return { hour, ampm };
  };

  const startObj = parseTime(start);
  const endObj = parseTime(end);

  // If both AM/PM are the same → show it only once
  const formattedTime =
    startObj.ampm === endObj.ampm
      ? `${startObj.hour} - ${endObj.hour}${endObj.ampm}`
      : `${startObj.hour}${startObj.ampm} - ${endObj.hour}${endObj.ampm}`;

  return `${formattedTime}, ${month} ${dayWithSuffix}, ${year}`;
}