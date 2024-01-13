import React from "react";
import "./forgetpwd.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import TextInputField from "../../components/TextInputField";
import "animate.css";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});
const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log("data ", data);
  const handleResetpwdClick = () => {
    navigate("/signin");
  };
  return (
    <div className=" flex flex-row h-screen">
      <section className=" flex flex-col justify-between py-4 px-6  sm:w-1/2">
        <article>
          <div>{logo}</div>
        </article>
        <article className=" px-10 animate__animated animate__bounceInLeft">
          <div className=" space-y-4">
            <h2 className=" text-white ">
              Password Reset{" "}
              <span className=" font-bold text-gradient2">Steins D-mail!</span>
            </h2>
            <p className=" text-noble-black-400">
              Lost your password? Send a D-mail to your inbox and unlock the
              gates of access!
            </p>
          </div>
          <div className="flex justify-center flex-col w-full mt-6">
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
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
                <TextInputField
                  icon={padlockOpen}
                  name="confirmPassword"
                  label="confire password"
                  type="password"
                  placeholder="confirm password"
                  control={control}
                />
              <button
                className={`w-full  text-day-blue-900 font-semibold  bg-stem-green-500 py-2 rounded-lg ${
                  !isValid ? " cursor-default opacity-75" : "cursor-pointer"
                }`}
                disabled={!isValid}
                type="submit"
              >
                reset password
              </button>
            </form>
          </div>
        </article>
        <article>
          <div className=" flex flex-row items-center gap-1 text-sm">
            <div className=" text-noble-black-400 ">Go back to</div>
            <button
              onClick={handleResetpwdClick}
              className={`font-bold  px-2 py-1 rounded-md hover:bg-neutral-300 hover:bg-opacity-10 transition duration-300`}
            >
              <p className="text-gradient5">Login</p>
            </button>
          </div>
        </article>
      </section>
      <section className="right-section2 w-1/2 flex  items-end text-white px-8 pr-12 py-6 font-semibold text-lg">
        <div className=" space-y-4">
          <div>
            <p>
              Artificium has been a game-changer for our content creation
              process.
            </p>
          </div>
          <div>
            <p>
              The AI-powered tools are incredibly user-friendly and have saved
              us countless hours of work.
            </p>
          </div>
          <div>
            <p className=" text-base font-normal ">akhrib abderahmane</p>
            <p className=" text-xs text-stem-green-500 font-normal">
              CTE at Software House
            </p>
          </div>
        </div>
      </section>
      <DevTool control={control} />
    </div>
  );
};

export default ForgotPassword;

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
const padlockOpen = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 10V8C8 5.79086 9.79086 4 12 4C13.36 4 14.5614 4.6787 15.2841 5.71586M12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15ZM12 15V17M7 20H17C18.1046 20 19 19.1046 19 18V12C19 10.8954 18.1046 10 17 10H7C5.89543 10 5 10.8954 5 12V18C5 19.1046 5.89543 20 7 20Z"
      stroke="#686B6E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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
