const getConversationalTimeLength = (timeInSeconds: number | null): string => {
  if (timeInSeconds) {
    if (
      Math.floor(timeInSeconds / 60) > 0 &&
      Math.floor(timeInSeconds / 60) <= 1
    ) {
      if (timeInSeconds % 60 === 0) {
        return Math.floor(timeInSeconds / 60) + " Hour";
      } else {
        return (
          Math.floor(timeInSeconds / 60) +
          " Hour " +
          (timeInSeconds % 60) +
          " Minutes"
        );
      }
    } else if (Math.floor(timeInSeconds / 60) >= 2) {
      if (timeInSeconds % 60 === 0) {
        return Math.floor(timeInSeconds / 60) + " Hours";
      } else {
        return (
          Math.floor(timeInSeconds / 60) +
          " Hours " +
          (timeInSeconds % 60) +
          " Minutes"
        );
      }
    } else {
      return (timeInSeconds % 60) + " Minutes";
    }
  } else {
    return "0 Minutes";
  }
};

export { getConversationalTimeLength };
