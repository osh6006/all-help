import { useState } from "react";
import moment from "moment";

const useTimePicker = () => {
  const [firstTime, setFirstTime] = useState("");
  const [secondTime, setSecondTime] = useState("");
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
