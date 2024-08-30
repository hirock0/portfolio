"use client";

import { useForm } from "react-hook-form";
import Style from "./signup.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { nanoid } from "@reduxjs/toolkit";

const SignUp = () => {
  const router = useRouter();
  const [userImg, setUserImg] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onFormData = async (signupData: any) => {
    try {
      signupData.userImg = userImg;
      signupData.NanoId = nanoid();
      signupData.recentDate = new Date().toLocaleDateString();
      const sendSignupData = await axios.post(
        "/pages/api/user/signup",
        signupData
      );
      if (sendSignupData?.data.success) {
        toast.success("Sign Up Successful");
        router.push("/");
      } else {
        toast.success(sendSignupData?.data.message);
      }
    } catch (error: any) {
      throw new Error("something went wrong", error);
    }
  };

  const base64 = (data: any) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(data.target.files[0]);

      reader.onload = (result: any) => {
        setUserImg(result.target.result);
      };
      reader.onerror = (errors: any) => {
        throw new Error("something went wrong", errors);
      };
    } catch (error: any) {
      throw new Error("something went wrong", error);
    }
  };

  return (
    <main className={`${Style.main} pb-10`}>
      <section className=" mt-5">
        <div className="  flex gap-2 max-md:flex-col-reverse ">
          <div
            className={`${Style.left_Section} rounded-md  w-full max-md:h-[60vh]`}
          ></div>
          {/* ---------------------------------------------- */}
          <div className=" relative w-full md:w-4/6 bg-white rounded-md overflow-hidden text-black ">
            <button
              onClick={() => router.back()}
              className=" absolute left-5 top-7"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
              </svg>
            </button>
            <h1 className="text-center text-2xl mt-5 font-semibold text-slate-500">
              Sign Up
            </h1>

            <form
              onSubmit={handleSubmit((data) => onFormData(data))}
              className=" bg-slate-100 p-5 pb-10 mt-5 overflow-hidden"
            >
              <div className="  mt-4 ">
                <h1>Name</h1>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Name"
                  className=" w-full h-10 rounded-sm border pl-5 outline-none mt-2"
                />
                {errors.name && <p>{errors.name?.message?.toString()}</p>}
              </div>
              <div className="  mt-4">
                <h1>Email</h1>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className=" w-full h-10 rounded-sm border pl-5 outline-none mt-2"
                />
                {errors.email && <p>{errors.email?.message?.toString()}</p>}
              </div>
              <div className=" mt-4  ">
                <h1>Password</h1>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={`${!checkPassword ? "password" : "text"}`}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className=" w-full h-10 rounded-sm border pl-5 outline-none mt-2"
                />
                {errors.password && (
                  <p>{errors.password?.message?.toString()}</p>
                )}
              </div>
              <div className=" mt-4  ">
                <h1>Re-Type Password</h1>
                <input
                  {...register("reTypePassword", {
                    required: "Re_Type_Password is required",
                  })}
                  type={`${!checkPassword ? "password" : "text"}`}
                  name="reTypePassword"
                  id="name"
                  placeholder="Enter Re-Type-Password"
                  className=" w-full h-10 rounded-sm border pl-5 outline-none mt-2"
                />
                {errors.reTypePassword && (
                  <p>{errors.reTypePassword?.message?.toString()}</p>
                )}
              </div>
              <div className=" mt-2">
                <input
                  onChange={() => setCheckPassword(!checkPassword)}
                  type="checkbox"
                  className="mt-2"
                />
              </div>
              <div className=" mt-4  ">
                <h1>Image</h1>
                <label
                  htmlFor="userImg"
                  className="h-10 rounded-sm border pl-5 mt-2 w-full  bg-white flex items-center"
                >
                  Choose Image
                </label>
                <input
                  onChange={(imgData) => base64(imgData)}
                  type="file"
                  accept="image/**"
                  name="userImg"
                  id="userImg"
                  className=" hidden"
                />
                {errors.userImg && <p>{errors.userImg?.message?.toString()}</p>}
              </div>
              <div className={` mt-4 ${userImg !== "" ? "block" : "hidden"}`}>
                <div className=" h-40 w-40 border">
                  <Image
                    src={userImg}
                    alt="userImg"
                    width={500}
                    height={500}
                    className=" w-full h-full"
                  />
                </div>
              </div>

              <div className=" mt-4  ">
                <button
                  type="submit"
                  className="h-10 rounded-sm border pl-5 mt-2 w-full bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
