import React from "react";
import "./signIn.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import TextInputField from "../../components/TextInputField";
import CheckBoxInput from "../../components/checkBoxInput";
import "animate.css";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().max(20).min(8).required(),
  })
  .required();

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const onSubmit = (data) => console.log("Submitted data: ", data);
  const navigate = useNavigate();
  const handleSingUpClick = () => {
    navigate("/signup");
  };
  const handleforgetPwdClick = () => {
    navigate("/forget-password");
  };
  return (
    <div className=" flex flex-row h-screen">
      <section className=" flex flex-col justify-between py-4 px-6  sm:w-1/2">
        <article>
          <div>{logo}</div>
        </article>
        <article className="flex justify-center flex-col  mx-12">
          <div className="animate__animated animate__bounceInLeft">
            <div className=" space-y-4">
              <h1 className=" text-white">
                Let's Enjoy
                <span className=" font-bold text-gradient2 tracking-wider">
                  Anime!
                </span>
              </h1>
              <p className=" text-noble-black-300 text-lg">
                Dive into anime magics, whith every frame tells a story.
              </p>
            </div>
          </div>
          <div className=" flex justify-center flex-col w-full mt-6 animate__animated animate__bounceInLeft">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <TextInputField
                icon={emailIcon}
                name="email"
                label="email"
                type="email"
                placeholder="email address"
                control={control}
              />
              <TextInputField
                icon={passwordIcon}
                name="password"
                label="password"
                type="password"
                placeholder="password"
                control={control}
              />
                   <div className=" flex flex-row justify-between my-4">
              <div>
                <CheckBoxInput
                  name="rememberMe"
                  control={control}
                  label="Remember me"
                />
              </div>
              <div>
                <button className="font-bold" onClick={handleforgetPwdClick}>
                  <p className="text-gradient5">forget password?</p>
                </button>
              </div>
            </div>
            <div>
              <button
                className={`w-full  text-day-blue-900 font-semibold  bg-stem-green-500 py-2 rounded-lg ${
                  !isValid ? " cursor-default opacity-75" : "cursor-pointer"
                }`}
                disabled={!isValid}
                type="submit"
              >
                Log in
              </button>
            </div>
            </form>
       
          </div>
        </article>
        <article>
          <div className=" flex flex-row items-center gap-1 text-sm">
            <div className=" text-noble-black-400 ">Don't have an account?</div>
            <button
              onClick={handleSingUpClick}
              className={`font-bold  px-2 py-1 rounded-md hover:bg-neutral-300 hover:bg-opacity-10 transition duration-300`}
            >
              <p className="text-gradient5">Sign Up</p>
            </button>
          </div>
        </article>
      </section>
      <section className=" right-section rounded-l-3xl rounded-tr-2xl  w-1/2"></section>
      <DevTool control={control} />
    </div>
  );
};

export default SignIn;

const logo = (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.0838 8.6578L32.6099 27.7157C33.8235 30.1435 32.0586 33 29.345 33H23.0838M23.0838 8.6578L20.2649 3.0184C18.9197 0.327197 15.0803 0.327199 13.7351 3.01841L1.39008 27.7157C0.176548 30.1435 1.94143 33 4.65496 33H10.9162M23.0838 8.6578L17 14.7434M10.9162 33H23.0838M10.9162 33L4.83249 26.9145M23.0838 33L10.9162 20.8289M17 14.7434L32.5136 30.2615M17 14.7434L10.9162 20.8289M1.48642 30.2615L4.83249 26.9145M4.83249 26.9145L10.9162 20.8289"
      stroke="url(#paint0_linear_696_1053)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_696_1053"
        x1="1"
        y1="33"
        x2="33"
        y2="1"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#82DBF7" />
        <stop offset="1" stopColor="#B6F09C" />
      </linearGradient>
    </defs>
  </svg>
);
const emailIcon = (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2L8 8M18 2L12 8M8 8L8.58579 8.58579C9.36684 9.36684 10.6332 9.36684 11.4142 8.58579L12 8M8 8L1.87868 14.1213M12 8L18.1213 14.1213M18.1213 14.1213C18.6642 13.5784 19 12.8284 19 12V3C19 1.89543 18.1046 1 17 1H3C1.89543 1 1 1.89543 1 3V12C1 12.8284 1.33579 13.5784 1.87868 14.1213M18.1213 14.1213C17.5784 14.6642 16.8284 15 16 15H4C3.17157 15 2.42157 14.6642 1.87868 14.1213"
      stroke="#686B6E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const passwordIcon = (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 7V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V7M8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12ZM8 12V14M3 17H13C14.1046 17 15 16.1046 15 15V9C15 7.89543 14.1046 7 13 7H3C1.89543 7 1 7.89543 1 9V15C1 16.1046 1.89543 17 3 17Z"
      stroke="#686B6E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
