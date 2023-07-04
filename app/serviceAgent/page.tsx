import Image from "next/image";
import React from "react";
import ServiceAuthForm from "./components/ServiceAuthForm";

const ServiceAgents = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image alt="Logo" height="48" width="48" priority={true} className="mx-auto w-auto" src="/images/logo.png" />
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
        상담원 가입을 시작합니다!
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
        상담원 계정을 생성하여
        <br />
        고객 여러분에게 서비스를 제공할 수 있어요
      </h3>
      <ServiceAuthForm />
    </div>
  );
};

export default ServiceAgents;
