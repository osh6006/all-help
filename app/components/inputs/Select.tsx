"use client";

import { AreaObj } from "@/app/utils/serviceAgent";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  label: string;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  option?: AreaObj[];
  validation?: any;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  required,
  register,
  errors,
  disabled,
  option,
  validation,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
        block
        text-sm
        font-medium
        leading-6
        text-gray-900
      "
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, validation)}
          className={clsx(
            `
            form-select
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
        >
          {option?.map((el, i) => (
            <option key={el.value} value={el.value}>
              {el.value}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-2 text-xs text-rose-400">
        {errors[id] && <span>{errors[id]?.message as React.ReactNode}</span>}
      </p>
    </div>
  );
};

export default Select;
