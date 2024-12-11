import { FC } from "react";

interface InputFieldProps {
  label: any;
  id: any;
  type: any;
  errors: any;
  register: any;
  required: any;
  message: any;
  className?: any;
  min?: any;
  value?: any;
  autoFocus?: any;
  placeholder?: any;
  readOnly?: any;
}

const InputField: FC<InputFieldProps> = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  autoFocus,
  placeholder,
  readOnly,
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id} className="font-semibold text-md text-slate-800">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={` px-2 py-2 border ${
        autoFocus ? "border-2" : ""
      }   outline-none bg-transparent text-slate-700 rounded-md ${
        errors[id]?.message ? "border-red-500" : "border-slate-700"
      }`}
      {...register(id, {
        required: { value: required, message },
        minLength: min
          ? { value: min, message: "Minimum 6 character is required" }
          : null,
      })}
      readOnly={readOnly}
    />
    {errors[id]?.message && (
      <p className="text-sm font-semibold text-red-500 mt-0" id={`${id}-error`}>
        {errors[id]?.message}
      </p>
    )}
  </div>
);

export default InputField;
