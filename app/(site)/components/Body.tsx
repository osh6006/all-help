"use client";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import "./homebody.css";

interface BodyProps {
  children: React.ReactNode;
}

const Body = () => {
  const router = useRouter();
  return (
    <div
      className="
        mt-2 
        flex
        items-center 
        justify-center 
        lg:ml-80 
        lg:mt-0
        lg:h-full
    "
    >
      <div
        className="
        flex
        h-full
        w-full
        max-w-5xl
        flex-col
        items-center 
        justify-start 
        text-center
        lg:flex-row
        lg:text-left
      "
      >
        <div className="mt-4 w-full space-y-5 px-6 sm:w-2/3 lg:mt-0 lg:w-4/5">
          <h1 className="text-3xl font-thin leading-[2.75rem]">
            기업과 소비자 <br />
            모두를 위한 <br />
            통합 서비스 채팅 플랫폼
          </h1>
          <p className="text-gray-500">
            All help를 이용하시면 기업은 소비자와의 소통을, 소비자는 원하는
            기업에 대한 서비스 요청을 할 수 있습니다.
          </p>
          <div className="mt-3">
            <Button onClick={() => router.push("/conversations")}>
              시작하기
            </Button>
          </div>
        </div>
        <div
          className="
          main-bg 
          h-[450px] 
          w-3/4 
          bg-contain 
          bg-center 
          bg-no-repeat 
          lg:bg-contain
        "
        />
      </div>
    </div>
  );
};

export default Body;
