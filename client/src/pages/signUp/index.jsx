import React from "react";
import "./signIn.css";
// import { logo } from '../../assets/svg/svg.js';

const SignIn = () => {
  return (
    <div className=" flex flex-row h-screen">
      <section className=" flex flex-col justify-between py-4 px-6  sm:w-1/2">
        <article>
          <div>{logo}</div>
        </article>
        <article className="flex justify-center">
          <div>
            <div className=" space-y-4">
              <h1 className=" text-white">Let's Enjoy <span className=" font-bold text-gradient2 tracking-wider">Anime!</span></h1>
              <p className=" text-noble-black-300 text-lg">Log in to Artificium to start creating magic.</p>
            </div>
          </div>
        </article>
        <article>
          <div className=" flex flex-row items-center gap-1 text-sm">
            <div className=" text-noble-black-400 ">Don't have an account?</div>
            <button className="font-bold  px-2 py-1 rounded-md hover:bg-neutral-300 hover:bg-opacity-10 transition duration-300">
              <p className="text-gradient5">Sign Up</p>
            </button>
          </div>
        </article>
      </section>
      <section className=" right-section rounded-l-xl  w-1/2"></section>
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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
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
        <stop stop-color="#82DBF7" />
        <stop offset="1" stop-color="#B6F09C" />
      </linearGradient>
    </defs>
  </svg>
);
