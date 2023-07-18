import clsx from "clsx";
import TimePicker from "rc-time-picker";
import "./timepicker.css";
import { Time } from "@/app/utils/serviceAgent";
import moment from "moment";

interface NewTimePickerProps {
  title?: string;
  setFirstTime: (value: string) => void;
  setSecondTime: (value: string) => void;
  error: boolean;
  disable: boolean;
  defaultValue?: string;
  firstTime?: Time;
  secondTime?: Time;
}

const NewTimePicker: React.FC<NewTimePickerProps> = ({
  setFirstTime,
  setSecondTime,
  title,
  error,
  disable,
  defaultValue,
  firstTime,
  secondTime,
}) => {
  const minuteStep = 30;
  const defaultFirstTime = moment(firstTime, "h:mm A");
  const defaultSecondTime = moment(secondTime, "h:mm A");

  return (
    <div>
      <div className="text-sm">{title}</div>
      <div
        className={clsx(
          "mt-2 flex items-center gap-4 rounded-md p-2",
          error && "border-2 border-red-500"
        )}
      >
        <TimePicker
          disabled={disable}
          minuteStep={minuteStep}
          showSecond={false}
          use12Hours
          defaultValue={defaultFirstTime}
          onChange={e => {
            if (e) {
              setFirstTime(e.format("LT"));
            } else {
              setFirstTime("");
            }
          }}
        />
        <span>~</span>
        <TimePicker
          disabled={disable}
          minuteStep={minuteStep}
          showSecond={false}
          defaultValue={defaultSecondTime}
          use12Hours
          onChange={e => {
            if (e) {
              setSecondTime(e.format("LT"));
            } else {
              setSecondTime("");
            }
          }}
        />
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-500">
          시간 범위를 다시 정해주세요.
        </div>
      )}
    </div>
  );
};

export default NewTimePicker;
