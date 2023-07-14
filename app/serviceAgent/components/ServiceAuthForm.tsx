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

    console.log(compareTimes(firstTime, secondTime));

    if (compareTimes(firstTime, secondTime) === 2) {
      const newData = { ...data, businessHours: `${firstTime},${secondTime}` };
      axios
        .post("/api/agentRegister", data)
        .then(() => {
          toast.success("가입이 완료되었습니다 로그인을 해주세요");
          reset();
          router.push("/");
        })
        .catch(() => toast.error("잘못 입력하셨습니다 !"))
        .finally(() => {
          setIsLoading(false);
          setTimeError(false);
        });
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
          <Input
            id="name"
            label="이름"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
            validation={{
              required: "이름을 입력해주세요.",
              minLength: {
                value: 2,
                message: "이름은 2글자 이상이어야 합니다.",
              },
              pattern: {
                value: /^[가-힣]+$/,
                message: "한글만 입력 가능합니다.",
              },
            }}
          />

          <Input
            id="email"
            label="이메일"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
            validation={{
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            }}
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            validation={{
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 이상이어야 합니다.",
              },
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                message:
                  "비밀번호는 숫자, 특수 문자를 포함한 영문 조합이어야 합니다.",
              },
            }}
          />
          <Input
            id="company"
            label="회사 이름"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
            validation={{
              required: "회사 이름을 입력해주세요.",
            }}
          />
          <div className="sm:col-span-2">
            <Select
              id="area"
              label="지역"
              register={register}
              errors={errors}
              disabled={isLoading}
              required
              validation={{
                required: "지역을 선택해 주세요.",
              }}
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

          <div className="flex items-center gap-2 sm:col-span-2">
            <NewTimePicker
              setFirstTime={setFirstTime}
              setSecondTime={setSecondTime}
              error={timeError}
              disable={isLoading}
              title="근무 시간"
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              id="companyImage"
              label="회사 이미지(로고)"
              type="file"
              register={register}
              errors={errors}
              disabled={isLoading}
              accept=".jpg, .jpeg, .png"
            />
          </div>

          <div className="sm:col-span-2">
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
  const timeFormat = /(\d+):(\d+)\s*(\w+)/;
  const [, hour1, minute1, meridiem1] = time1.match(timeFormat) || [];
  const [, hour2, minute2, meridiem2] = time2.match(timeFormat) || [];

  if (!hour1 || !minute1 || !meridiem1 || !hour2 || !minute2 || !meridiem2) {
    return 0;
  }

  const formattedTime1 = `${
    parseInt(hour1) + (meridiem1.toLowerCase() === "pm" ? 12 : 0)
  }:${minute1}`;
  const formattedTime2 = `${
    parseInt(hour2) + (meridiem2.toLowerCase() === "pm" ? 12 : 0)
  }:${minute2}`;

  const date1 = new Date(`2000-01-01T${formattedTime1}`);
  const date2 = new Date(`2000-01-01T${formattedTime2}`);

  if (date1 > date2) {
    return 1;
  } else if (date1 < date2) {
    return 2;
  } else {
    return 0;
  }
}
