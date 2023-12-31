"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  accept?: string;
  validation?: any;
  placeHolder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  accept,
  validation,
  placeHolder,
}) => {
  return (
    <div>
      <label
        className="
            block
            text-sm
            font-medium
            leading-6
            text-gray-900
        "
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          accept={accept}
          {...register(id, validation)}
          placeholder={placeHolder}
          className={clsx(
            `
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-orange-400
            sm:text-sm
            sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "cursor-default opacity-50"
          )}
        />
      </div>
      <p className="mt-2 text-xs text-rose-400">
        {errors[id] && <span>{errors[id]?.message as React.ReactNode}</span>}
      </p>
    </div>
  );
};

export default Input;
