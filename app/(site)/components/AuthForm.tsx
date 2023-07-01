"use client";

import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

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
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // 서버에 가입 요청
      axios
        .post("/api/register", data)
        .catch(() => toast.error("잘못 입력하셨습니다 !"))
        .finally(() => setIsLoading(false))
        .then(() => {
          reset();
          toast.success("가입이 완료되었습니다 !");
          setVariant("LOGIN");
        });
    }

    if (variant === "LOGIN") {
      // NextAuth에 SignIn 요청
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then(callback => {
          if (callback?.error) {
            toast.error(callback.error || "유효하지 않은 정보입니다.");
          }

          if (callback?.ok && !callback.error) {
            toast.success("로그인에 성공하셨습니다 !");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth에 소셜 로그인 요청
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
          {/* 회원가입일 경우  */}
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          {/* === */}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button disabled={isLoading} type="submit" fullWidth>
            {variant === "LOGIN" ? "로그인" : "회원 가입"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                  absolute
                  inset-0
                  flex
                  items-center
                "
            >
              <div
                className="
                    w-full 
                    border-t 
                    border-gray-300
                    "
              />
            </div>
            <div
              className="
                  relative 
                  flex 
                  justify-center 
                  text-sm
                "
            >
              <span
                className="
                  bg-white 
                  px-2 
                  text-gray-500
                  "
              >
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
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
          <div>
            {variant === "LOGIN"
              ? "새 계정이 필요하신가요?"
              : "이미 계정이 있으신가요?"}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "LOGIN" ? "새 계정 만들기" : "로그인 하기"}
          </div>
        </div>

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
          <div>상담 센터 직원 이신가요?</div>
          <div className="cursor-pointer underline">직원 회원 가입 하기</div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
