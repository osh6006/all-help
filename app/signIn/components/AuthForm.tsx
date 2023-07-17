"use client";

import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useIsUser from "@/app/hooks/useIsUser";
import useVariant from "@/app/hooks/useVariant";

const AuthForm = () => {
  const isUser = useIsUser();
  const router = useRouter();
  const variant = useVariant(state => state.variant);
  const toggleVariant = useVariant(state => state.toggleVariant);
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
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // 서버에 가입 요청
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("가입이 완료되었습니다 !");
          reset();
          toggleVariant();
        })
        .catch(() => toast.error("잘못 입력하셨습니다 !"))
        .finally(() => setIsLoading(false));
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
            router.push("/");
          }
        })
        .finally(() => {
          reset();
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth에 소셜 로그인 요청
    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error(`${action} 계정에 오류가 있습니다! `);
        }

        if (callback?.ok && !callback?.error) {
          toast.success(`${action} 계정으로 로그인 하셨습니다!`);
        }
      })
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
          {/* 회원가입일 경우  */}
          {variant === "REGISTER" && (
            <>
              <Input
                id="name"
                label="이름"
                register={register}
                errors={errors}
                disabled={isLoading}
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
            </>
          )}
          {variant === "LOGIN" && (
            <>
              <Input
                id="email"
                label="이메일"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
                validation={{
                  required: "이메일을 입력해주세요.",
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
                }}
              />
            </>
          )}
          {/* === */}
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
                소셜 계정으로도 로그인이 가능해요
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
              color="text-violet-600"
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
              color="text-red-600"
            />
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={SiNaver}
              onClick={() => socialAction("naver")}
              color="text-green-600"
            />
            <AuthSocialButton
              icon={RiKakaoTalkFill}
              onClick={() => socialAction("kakao")}
              color="text-yellow-500"
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
          <div
            onClick={() => {
              toggleVariant();
              reset();
            }}
            className="cursor-pointer underline"
          >
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
          <div
            onClick={() => router.push("/serviceAgent")}
            className="cursor-pointer underline"
          >
            직원 회원 가입 하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
