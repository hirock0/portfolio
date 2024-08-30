"use client";

import { nanoid } from "@reduxjs/toolkit";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
const My_Projects = () => {
  const [projectimgData, setProjectimgData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onBase64 = (e: any) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (result: any) => {
        setProjectimgData(result.target?.result || "");
      };
      reader.onerror = (error) => {
        toast.success("Image not converted to base64" + error);
      };
    } catch (error) {
      console.log("something went wrong to converting image");
    }
  };

  const onProjects = async (e: any) => {
    try {
      e.NanoId = nanoid();
      e.projectImage = projectimgData;
      e.recentDate = new Date().toLocaleDateString();

      if (e.projectImage == "") {
        toast.success("Project Image is empty");
      } else {
        console.log(e)
        await axios.post("/pages/api/admin_api/upload_projects", e);
        toast.success("file sent");

      }
    } catch (error: any) {
      toast.success("project data is not sent" + error);
    }
  };

  return (
    <main>
      <section>
      <div className="  w-full">
        <h1 className=" text-center">Upload your projects</h1>
        <div className=" flex max-md:flex-col mt-5 gap-5">
          <div className=" w-full ">
            <form onSubmit={handleSubmit((data: any) => onProjects(data))}>
              <div className=" ">
              
                <h1>Project Title</h1>
                <input
                  {...register("projectTitle", {
                    required: "Project title is required !",
                  })}
                  type="text"
                  placeholder="project title"
                  name="projectTitle"
                  id="projectTitle"
                  className=" w-full  pl-2 h-10 rounded-sm mt-2 outline-none text-black"
                />
                {errors.projectTitle && (
                  <p className=" text-red-600 text-sm text-center mt-2">
                    {errors.projectTitle.message?.toString()}
                  </p>
                )}
              </div>

              {/* ----------------------------------------------- */}


              <div className=" ">
              
                <h1>Project Type</h1>
                <select   {...register("projectType", {
                    required: "ProjectType is required !",
                  })} name="projectType" id="ProjectType" className=" w-full  pl-2 h-10 rounded-sm mt-2 outline-none text-black">
                  <option value="">Select Project Type</option>
                  <option value="fullStack"> FullStack</option>
                  <option value="frontend">Frontend</option>
                </select>
                {errors.projectType && (
                  <p className=" text-red-600 text-sm text-center mt-2">
                    {errors.projectType.message?.toString()}
                  </p>
                )}
              </div>

              {/* ------------------------------------------------- */}

              <div className=" mt-5">
                <h1>Project Link</h1>
                <input
                  {...register("projectLink", {
                    required: "Project link is required !",
                  })}
                  type="text"
                  placeholder="project link"
                  name="projectLink"
                  id="projectLink"
                  className=" w-full  pl-2 h-10 rounded-sm mt-2 outline-none text-black"
                />
                {errors.projectLink && (
                  <p className=" text-red-600 text-sm text-center mt-2">
                    {errors.projectLink.message?.toString()}
                  </p>
                )}
              </div>
              <div className=" mt-5">
                <h1>Project Image</h1>
                <label
                  htmlFor="projectImage"
                  className="w-full  pl-2 h-10 rounded-sm mt-2 outline-none text-black  flex items-center bg-white"
                >
                  Choose
                </label>
                <input
                  onChange={(e) => onBase64(e)}
                  type="file"
                  accept="image/**"
                  name="projectImage"
                  id="projectImage"
                  className=" hidden w-full"
                />
              </div>
              <div
                className={`${
                  projectimgData == "" ? "hidden" : "block"
                } mt-5  flex items-center justify-center`}
              >
                <Image
                  src={projectimgData}
                  alt="project image"
                  width={200}
                  height={200}
                  className=" rounded-sm"
                />
              </div>

              <div className=" mt-5">
                <h1>Descriptions</h1>
                <textarea
                  {...register("descriptions", {
                    required: "Project descriptions is required !",
                  })}
                  placeholder="project descriptions"
                  name="descriptions"
                  id="descriptions"
                  className=" w-full  pl-2 h-32 rounded-sm mt-2 outline-none text-black"
                />
                {errors.descriptions && (
                  <p className=" text-red-600 text-sm text-center mt-2">
                    {errors.descriptions.message?.toString()}
                  </p>
                )}
              </div>

              <div className="">
                <button
                  type="submit"
                  className=" mt-5 w-full h-10 rounded-md bg-orange-600 hover:bg-orange-700 active:bg-orange-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* ----------- */}
          <div className=" w-full">
            <h1 className=" text-center">Upload Instructions</h1>
            <p className=" lg:text-base md:text-xs max-md:text-base mt-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
              laboriosam repudiandae fuga recusandae, similique numquam aliquid
              delectus ad soluta distinctio enim deserunt saepe fugit odio
              consequatur velit minima id? Modi. alias! Quidem odio at omnis
              rerum nihil quasi excepturi facere! Aspernatur quos voluptas dolor
              quam quas quibusdam tenetur modi in sequi! Tempore sapiente quidem
              eveniet obcaecati. Alias perferendis nulla ipsum maxime.
              Reiciendis distinctio maxime nulla. Reprehenderit dolorum
              provident veniam officia dolores. Est cupiditate libero nulla
              labore quia? Quidem iste quod eius molestias. Recusandae
              voluptates nobis consectetur itaque labore, laboriosam quibusdam
              minima.
            </p>
          </div>
        </div>
        {/* --------------- */}
      </div>
      </section>
    </main>
  );
};

export default My_Projects;
