"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { HiPaperAirplane, HiPhotograph } from "react-icons/hi";
import MessageInput from "./MessageInput";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div
      className="
      flex
      w-full
      items-center
      gap-2
      border-t
      bg-white
      px-4
      py-4
      lg:gap-4
    "
    >
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="m5qf4qmx">
        <HiPhotograph size={30} className="text-orange-500" />
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2 lg:gap-4">
        <MessageInput id="message" register={register} errors={errors} required placeholder="메세지를 작성해 보세요" />
        <button
          type="submit"
          className="
          cursor-pointer
          rounded-full
          bg-orange-400
          p-2
          transition
          hover:bg-orange-500
          
        "
        >
          <HiPaperAirplane size={18} className="rotate-90 text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
