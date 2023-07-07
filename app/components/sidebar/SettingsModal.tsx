"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, isOpen, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("오류가 발생했습니다 !"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="

        "
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">프로필 수정</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">내 정보를 수정해 보세요.</p>
            <div
              className="
              mt-10
              flex
              flex-col
              gap-y-8
            "
            >
              <Input id="name" label="이름" errors={errors} required register={register} disabled={isLoading} />
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
                    src={image || currentUser?.image || "/image/placeholder.jpg"}
                    alt="Avatar"
                  />
                  <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="m5qf4qmx">
                    <Button disabled={isLoading} secondary type="button">
                      바꾸기
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
            <Button disabled={isLoading} secondary onClick={onClose}>
              취소
            </Button>
            <Button disabled={isLoading} type="submit">
              저장
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;