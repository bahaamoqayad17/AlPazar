const getTime = (timestamp) => {
  if (!timestamp) return "غير معروف"; // Handle undefined/null timestamps

  let createdTime;

  // If timestamp is a number, use it as is; if it's a string, parse it
  if (typeof timestamp === "string") {
    if (!isNaN(timestamp)) {
      createdTime = new Date(Number(timestamp)); // Convert numeric string to Date
    } else {
      createdTime = new Date(timestamp); // Convert ISO string to Date
    }
  } else {
    createdTime = new Date(timestamp);
  }

  // Validate Date
  if (isNaN(createdTime.getTime())) return "غير معروف"; // Handle invalid dates

  const currentTime = new Date();
  const differenceInMilliseconds = currentTime - createdTime;

  if (differenceInMilliseconds < 0) return "الآن"; // Handle future dates

  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60)
  );
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInMinutes < 1) {
    return "الآن"; // Less than 1 minute
  } else if (differenceInMinutes < 60) {
    return `منذ ${differenceInMinutes} دقيقة`;
  } else if (differenceInHours < 24) {
    return `منذ ${differenceInHours} ساعة`;
  } else {
    return `منذ ${differenceInDays} يوم`;
  }
};

export default getTime;
