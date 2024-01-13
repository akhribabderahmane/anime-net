import React from "react";
import { useController } from "react-hook-form";

const CheckBoxInput = ({ label, control, name }) => {
  const { field, fieldState } = useController({ control,name });

  return (
    <div className=" flex items-center gap-2">
      <label
        htmlFor={name}
        className={`box-content w-[20px] rounded-[4px] aspect-square border-[1px] border-noble-black-400 bg-noble-black-600 hover:border-[1.5px] transition-all duration-1500 flex items-center justify-center ${field.value?"bg-inherit third-gradient border-none":""} cursor-pointer `}
      >
        <input type="checkbox" id={name} className="hidden" {...field} />
        {field.value && checkMarkIcon}
      </label>
      <span className=" text-noble-black-200 text-sm">{label}</span>
    </div>
  );
};

export default CheckBoxInput;

const checkMarkIcon = (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 3.4L4.14546 6.22183C4.54054 6.64324 5.20946 6.64324 5.60454 6.22183L10.5 1"
      stroke="#0C1132"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
