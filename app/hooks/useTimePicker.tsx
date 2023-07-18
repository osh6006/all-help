import { useState } from "react";
import { Time } from "../utils/serviceAgent";

const useTimePicker = () => {
  const [firstTime, setFirstTime] = useState<Time>("");
  const [secondTime, setSecondTime] = useState<Time>("");
  const [timeError, setTimeError] = useState(false);

  return {
    firstTime,
    setFirstTime,
    secondTime,
    setSecondTime,
    timeError,
    setTimeError,
  };
};

export default useTimePicker;
