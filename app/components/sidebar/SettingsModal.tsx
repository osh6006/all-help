"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import { signOut } from "next-auth/react";
import Select from "../inputs/Select";
import { AreaArray, compareTimes } from "@/app/utils/serviceAgent";
import useTimePicker from "@/app/hooks/useTimePicker";
import NewTimePicker from "../inputs/NewTimePicker";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  isOpen,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      company: currentUser?.company,
      image: currentUser?.image,
      cphone: currentUser?.cphone,
      area: currentUser?.area,
    },
  });

  const {
    firstTime,
    secondTime,
    setFirstTime,
    setSecondTime,
    setTimeError,
    timeError,
  } = useTimePicker();

  useEffect(() => {
    setFirstTime(currentUser.businessHours?.split("~")[0].trim());
    setSecondTime(currentUser.businessHours?.split("~")[1].trim());
  }, [currentUser?.businessHours, setSecondTime, setFirstTime]);

  const handleTimeReset = () => {
    setFirstTime(currentUser.businessHours?.split("~")[0].trim());
    setSecondTime(currentUser.businessHours?.split("~")[1].trim());
    setTimeError(false);
  };

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    if (compareTimes(firstTime, secondTime) === 2) {
      const newData = {
        ...data,
        businessHours: `${firstTime} ~ ${secondTime}`,
      };
      axios
        .post("/api/settings", newData)
        .then(() => {
          router.refresh();
          handleReset();
          handleTimeReset();
          onClose();
        })
        .catch(error => toast.error(`${error}`))
        .finally(() => {
          setIsLoading(false);
          setTimeError(false);
        });
    } else {
      setTimeError(true);
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    reset({
      name: currentUser?.name,
      company: currentUser?.company,
      image: currentUser?.image,
      cphone: currentUser?.cphone,
      area: currentUser?.area,
    });
  };

  return (
    <Modal
      onClose={() => {
        handleReset();
        handleTimeReset();
        onClose();
      }}
      isOpen={isOpen}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="

        "
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              프로필 수정
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              내 정보를 수정해 보세요.
            </p>
            <div
              className="
              mt-10
              flex
              flex-col
              gap-y-4
            "
            >
              <Input
                id="name"
                label="이름"
                errors={errors}
                required
                register={register}
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
              {currentUser?.role === "agent" && (
                <>
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
                  <Input
                    id="cphone"
                    label="회사 전화번호"
                    errors={errors}
                    required
                    register={register}
                    disabled={isLoading}
                    validation={{
                      required: "회사 번호를 입력해주세요.",
                      pattern: {
                        value:
                          /^0(1[0]|2|3[1-3]|4[1-4]|5[1-5]|6[1-4])-?([0-9]{3,4})-?([0-9]{4})$/,
                        message: "유효한 전화번호를 입력해주세요.",
                      },
                    }}
                  />
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
                  <NewTimePicker
                    setFirstTime={setFirstTime}
                    setSecondTime={setSecondTime}
                    error={timeError}
                    disable={isLoading}
                    title="근무 시간"
                    firstTime={firstTime}
                    secondTime={secondTime}
                  />
                </>
              )}
              <div>
                <label
                  className="
                  block
                  text-sm
                  font-medium
                  leading-6
                  text-gray-900
                "
                >
                  프로필 사진
                </label>
                <div
                  className="
                  mt-2
                  flex
                  items-center
                  gap-x-3
                "
                >
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="m5qf4qmx"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      수정하기
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
            mt-6
            flex
            items-center
            justify-end
            gap-x-6
          "
          >
            <Button
              disabled={isLoading}
              secondary
              onClick={() => {
                handleReset();
                handleTimeReset();
                onClose();
              }}
            >
              취소
            </Button>
            <Button disabled={isLoading} type="submit">
              저장
            </Button>
          </div>
        </div>
      </form>
      <Button disabled={isLoading} onClick={() => signOut()}>
        로그아웃
      </Button>
    </Modal>
  );
};

export default SettingsModal;
