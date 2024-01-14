import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
const Verification = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/signin");
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
              Welcome to{" "}
              <span className=" font-bold text-gradient2">Anime Hub!</span>
            </h2>
            <p className=" text-noble-black-400">
              Confirm your email! Check your inbox for the confirmation link and
              embark on your anime adventure with Anime Hub!{" "}
            </p>
          </div>
          <div className="flex flex-col items-center gap-y-6 w-full mt-10">
            <h2 className="  text-noble-black-100 font-semibold ">
              Confirmation Code
            </h2>
            <div>
              <form className=" flex flex-row gap-3">
                {[1, 2, 3, 4].map((num) => {
                  return (
                    <input
                      key={num}
                      type="text"
                      className=" outline-none bg-noble-black-500 border-[2px] border-noble-black-400 rounded-md w-9 pl-[11px] aspect-square text-gradient5 font-semibold"
                      maxLength={1}
                      id={`digit${num}`}
                    />
                  );
                })}
              </form>
            </div>
            <div>{checkMark}</div>
            <div><CircularProgress isIndeterminate color='#363A3D' size={42} thickness={10} trackColor="#1A1D21bb" /></div>
          </div>
        </article>
      </section>
      <section className=" right-section3 w-1/3 rounded-t-2xl"></section>
    </div>
  );
};

export default Verification;

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

const checkMark = (
<svg
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="checkMarkGradient"
        x1="0%"
        y1="100%"
        x2="100%"
        y2="0%"
      >
        <stop offset="5%" style={{ stopColor: '#9AD37F', stopOpacity: 1 }} />
        <stop offset="65%" style={{ stopColor: '#65BEDA', stopOpacity: 1 }} />
        <stop offset="95%" style={{ stopColor: '#3045C9', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289C16.3166 8.90237 15.6834 8.90237 15.2929 9.29289L11 13.5858L8.70711 11.2929C8.31658 10.9024 7.68342 10.9024 7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L9.58579 15C10.3668 15.781 11.6332 15.781 12.4142 15L16.7071 10.7071Z"
      fill="url(#checkMarkGradient)"
    />
  </svg>
);
