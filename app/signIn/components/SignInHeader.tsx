"use client";
import useVariant from "@/app/hooks/useVariant";
import Image from "next/image";

const SignInHeader = () => {
  const variant = useVariant(state => state.variant);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image
        alt="Logo"
        height="48"
        width="48"
        priority={true}
        className="mx-auto w-auto"
        src="/images/logo.png"
      />
      <h2
        className="
            mt-6
            text-center
            text-3xl
            font-normal
            tracking-tight
            text-gray-900
            "
      >
        {variant === "LOGIN" && "환영합니다!"}
        {variant === "REGISTER" && "가입을 시작합니다!"}
      </h2>
      <h3
        className="
            mt-6
            text-center
            text-lg
            font-normal
            tracking-tighter
            text-gray-500
        "
      >
        {variant === "LOGIN" && "All Help 계정에 로그인 후"}
        {variant === "REGISTER" && "All Help 계정을 생성하여"}
        <br />
        다양한 서비스를 편리하게 이용해 보세요.
      </h3>
    </div>
  );
};

export default SignInHeader;
