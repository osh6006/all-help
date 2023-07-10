import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function SignIn() {
  return (
    <div
      className="
        flex 
        min-h-full flex-col
        justify-center 
        bg-gray-100 
        py-12 
        sm:px-6 
        lg:px-8"
    >
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
          가입을 시작합니다!
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
          All Help 계정을 생성하여
          <br />
          다양한 서비스를 편리하게 이용해 보세요.
        </h3>
      </div>
      <AuthForm />
    </div>
  );
}
