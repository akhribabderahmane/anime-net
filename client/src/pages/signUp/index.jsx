import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import TextInputField from "./../../components/TextInputField";
import "animate.css";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  })
  .required();
const SignUp = () => {
  const navigate=useNavigate();
  const handleLoginClick=()=>{
    navigate("/signin")
  }
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log("Submitted data: ", data);
    // Add user to the database here
    const signUpForm = {
        username: data.username,
        email: data.email,
        password: data.password,
    };

    try {
        // Make a POST request to the server
        const response=await axios.post("http://localhost:3000/api/user/signUp", signUpForm);
        alert(`Account created for ${data.username}! You can now log in.`);
        console.log("userID",response.data._id);

        // Handle successful sign-up (e.g., redirect to login page)
    } catch (error) {
        // Handle error
        console.error("Error creating account:", error);
        // Show error message to the user
        alert("An error occurred while creating your account. Please try again later.");
    }
};

  return (
    <div className=" flex flex-row h-screen">
      <section className=" flex flex-col justify-start gap-20 py-4 px-6  w-2/3">
        <article className=" flex flex-row justify-between items-center">
          <div>{logo}</div>
          <div>
            <button
              onClick={handleLoginClick}
              className={`font-bold  px-2 py-1 rounded-md hover:bg-neutral-300 hover:bg-opacity-10 transition duration-300`}
            >
              <p className="text-gradient5">Login</p>
            </button>
          </div>
        </article>
        <article className="  px-14 animate__animated animate__bounceInLeft">
          <div className=" space-y-4">
            <h2 className=" text-white ">
              Join the{" "}
              <span className=" font-bold text-gradient2">Anime Hub!</span>
            </h2>
            <p className=" text-noble-black-400">
              Unlock the doors to a world of anime wonders by signing up today.
              Join the Anime Hub Club!
            </p>
          </div>
          <div className="flex justify-center flex-col w-full mt-6">
            <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <TextInputField
                icon={userIcon}
                name="username"
                label="username"
                type="text"
                placeholder="jhon Doe"
                control={control}
              />
              <TextInputField
                icon={emailIcon}
                name="email"
                label="email"
                type="email"
                placeholder="email address"
                control={control}
              />
              <div className=" w-full flex flex-row gap-2 ">
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
              </div>
              <button
                className={`w-full  text-day-blue-900 font-semibold  bg-stem-green-500 py-2 rounded-lg ${
                  !isValid ? " cursor-default opacity-75" : "cursor-pointer"
                }`}
                disabled={!isValid}
                type="submit"
              >
                create account
              </button>
            </form>
          </div>
        </article>
      </section>
      <section className=" right-section3 w-1/3 rounded-t-2xl"></section>
      <DevTool control={control}/>
    </div>
  );
};

export default SignUp;
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
const userIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 21C19 17.6863 16.3137 15 13 15H11C7.68629 15 5 17.6863 5 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
      stroke="#686B6E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
