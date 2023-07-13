"use client";
import axios from "axios";
import Button from "@/app/components/Button";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useIsUser from "@/app/hooks/useIsUser";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { AreaArray, AreaObj } from "@/app/utils/serviceAgent";
import useTimePicker from "@/app/hooks/useTimePicker";
import NewTimePicker from "@/app/components/inputs/NewTimePicker";

const ServiceAuthForm = () => {
  const isUser = useIsUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    firstTime,
    secondTime,
    setFirstTime,
    setSecondTime,
    setTimeError,
    timeError,
  } = useTimePicker();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      company: "",
      companyImage: "",
      area: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    // 서버에 가입 요청

    if (compareTimes(firstTime, secondTime) === 2) {
      axios
        .post("/api/agentRegister", data)
        .then(() => {
          toast.success("가입이 완료되었습니다 로그인을 해주세요");
          reset();
          router.push("/");
        })
        .catch(() => toast.error("잘못 입력하셨습니다 !"))
        .finally(() => setIsLoading(false));
    } else {
      setTimeError(true);
    }

    setIsLoading(false);
  };

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-lg
    "
    >
      <div
        className="
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        "
      >
        <form
          className="
        grid
        grid-cols-1
        items-center
        gap-3
        sm:grid-cols-2
        
        "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <Input
              id="name"
              label="이름"
              register={register}
              errors={errors}
              disabled={isLoading}
              required
            />
          </div>

          <Input
            id="email"
            label="이메일"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="company"
            label="회사 이름"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
          <div className="col-span-2">
            <Select
              id="area"
              label="지역"
              register={register}
              errors={errors}
              disabled={isLoading}
              required
              option={AreaArray.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })}
            />
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <NewTimePicker
              setFirstTime={setFirstTime}
              setSecondTime={setSecondTime}
              error={timeError}
              disable={isLoading}
              title="근무 시간"
            />
          </div>

          <div className="col-span-2">
            <Input
              id="companyImage"
              label="Company Image"
              type="file"
              register={register}
              errors={errors}
              disabled={isLoading}
              accept=".jpg, .jpeg, .png"
            />
          </div>

          <div className="col-span-2">
            <Button disabled={isLoading} type="submit" fullWidth>
              회원 가입
            </Button>
          </div>
        </form>

        <div
          className="
            mt-6
            flex
            justify-center
            gap-2
            px-2
            text-sm
            text-gray-500
        "
        >
          <div>이미 계정이 있으신가요?</div>
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer underline"
          >
            로그인 하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAuthForm;

function compareTimes(time1: string, time2: string): number {
  const [hour1, minute1, period1] = getTimeComponents(time1);
  const [hour2, minute2, period2] = getTimeComponents(time2);

  // 시간을 24시간 형식으로 변환하여 비교합니다.
  const convertedTime1 = convertTo24HourFormat(hour1, minute1, period1);
  const convertedTime2 = convertTo24HourFormat(hour2, minute2, period2);

  if (convertedTime1 > convertedTime2) {
    return 1;
  } else if (convertedTime1 < convertedTime2) {
    return 2;
  } else {
    return 0;
  }
}

function getTimeComponents(time: string): [number, number, string] {
  const [timeString, period] = time.split(" ");
  const [hourString, minuteString] = timeString.split(":");
  const hour = parseInt(hourString);
  const minute = parseInt(minuteString);

  return [hour, minute, period];
}

function convertTo24HourFormat(hour: number, minute: number, period: string) {
  let convertedHour = hour;

  if (period === "PM" && hour !== 12) {
    convertedHour += 12;
  } else if (period === "AM" && hour === 12) {
    convertedHour = 0;
  }

  return convertedHour * 60 + minute;
}
