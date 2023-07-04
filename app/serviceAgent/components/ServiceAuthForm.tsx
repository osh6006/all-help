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

const ServiceAuthForm = () => {
  const isUser = useIsUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // 서버에 가입 요청
    axios
      .post("/api/agentRegister", data)
      .then(() => {
        toast.success("가입이 완료되었습니다 로그인을 해주세요");
        reset();
        router.push("/");
      })
      .catch(() => toast.error("잘못 입력하셨습니다 !"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} required />
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input id="company" label="Company Name" register={register} errors={errors} disabled={isLoading} required />
          <Select
            id="area"
            label="Area"
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
          <Input
            id="companyImage"
            label="Company Image"
            type="file"
            register={register}
            errors={errors}
            disabled={isLoading}
            accept=".jpg, .jpeg, .png"
          />

          <Button disabled={isLoading} type="submit" fullWidth>
            회원 가입
          </Button>
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
          <div onClick={() => router.push("/")} className="cursor-pointer underline">
            로그인 하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAuthForm;
