import React, { useState } from "react";
import { useController } from "react-hook-form";
const TextInputField = ({ control, name, label, type, placeholder, icon }) => {
  const { field, fieldState } = useController({ control, name });
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="mb-4 w-full">
      <div
        className={`w-full bg-noble-black-600 rounded-lg flex flex-row gap-2 px-3 py-2 items-center text-white border-[1.5px] ${
          isFocused
            ? " border-stem-green-400 shadow-input"
            : "border-noble-black-400 "
        }
        ${(fieldState?.error && !isFocused)?" border-red-power-600":""}`}
      >
        <div>{icon}</div>
        <input
          className="w-full bg-noble-black-600  outline-none placeholder-noble-black-400"
          type={type}
          name={label}
          id={label}
          placeholder={placeholder}
          {...field}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            field.onBlur();
          }}
        />
      </div>
      {fieldState?.error && (
        <div className="flex flex-row items-center gap-2 mt-1">
          {infOcircleIcon}
          <p className=" text-red-power-600 text-sm mb-[2px]">
            {fieldState?.error?.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextInputField;

const infOcircleIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.333374 6.99992C0.333374 3.31802 3.31814 0.333252 7.00004 0.333252C10.6819 0.333252 13.6667 3.31802 13.6667 6.99992C13.6667 10.6818 10.6819 13.6666 7.00004 13.6666C3.31814 13.6666 0.333374 10.6818 0.333374 6.99992ZM7.00004 3.66659C6.63185 3.66659 6.33337 3.96506 6.33337 4.33325C6.33337 4.70144 6.63185 4.99992 7.00004 4.99992H7.00671C7.3749 4.99992 7.67337 4.70144 7.67337 4.33325C7.67337 3.96506 7.3749 3.66659 7.00671 3.66659H7.00004ZM7.66671 6.99992C7.66671 6.63173 7.36823 6.33325 7.00004 6.33325C6.63185 6.33325 6.33337 6.63173 6.33337 6.99992V9.66659C6.33337 10.0348 6.63185 10.3333 7.00004 10.3333C7.36823 10.3333 7.66671 10.0348 7.66671 9.66659V6.99992Z"
      fill="#D0302F"
    />
  </svg>
);
