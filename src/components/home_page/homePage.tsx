"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AllApiHandler } from "@/utils/redux/slices/slice";
import LikeBtn from "./likeBtn/likebtn";

const HomePage = () => {
  const dispatch = useDispatch();

  const Products = useSelector((state: any) => state);
  const AllProducts = Products?.Slice?.data?.products;
  useEffect(() => {
    dispatch(AllApiHandler());
  }, []);
  return (
    <div className="  flex flex-col justify-center items-center">
      <div className=" md:p-5 max-md:py-5 rounded-md  bg-base-100 flex items-center justify-between  lg:text-4xl max-lg:text-2xl max-md:flex-col-reverse max-md:text-xl max-sm:text-base   w-full">
        <div className=" DesignerTitle relative  py-2 max-md:py-0 h-full overflow-hidden font-semibold text-accent max-md:mt-10 ">
          Hi,I am (Hirock), <span className=" max-sm:hidden">professional</span>{" "}
          web dev.
        </div>
        <motion.div
          className="avatar "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-48 max-md:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src="https://cdn.pixabay.com/photo/2023/06/10/07/18/business-8053376_960_720.jpg"
              alt="Profile Picture"
              width={192}
              height={192}
              priority
            />
          </div>
        </motion.div>
      </div>

      <motion.section
        className=" py-5 rounded-md text-center mb-10 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="mt-4 lg:w-4/6 mx-auto">
          I am a passionate Full Stack Developer with expertise in modern web
          technologies such as React, Next.js, Node.js, and Tailwind CSS. I love
          building dynamic, responsive websites and applications that provide a
          seamless user experience.
        </p>
      </motion.section>

      <motion.section
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        

        <div className="   mt-4">
        <h1 className="text-3xl font-bold">Full Stack Projects</h1>
          <motion.div className=" mt-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
          
          >
            <Swiper
              pagination={true}
              spaceBetween={50}
              modules={[Pagination, Navigation]}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },

                768: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },

                1024: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
              }}
            >
              {AllProducts?.filter((item:any)=>item.projectType == "fullStack")?.map((item:any, index: any) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="card  bg-base-100   "
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="card-body">
                      <div className=" w-full">
                        <Image
                          src={item?.projectImage}
                          alt="project"
                          width={500}
                          height={500}
                          priority
                          className=" object-cover w-full h-full rounded-sm"
                        />
                      </div>
                      <h1 className="card-title">{item?.projectTitle}</h1>
                      <p>{item?.descriptions}</p>

                      <div className="card-actions justify-between">
                        <div className=" flex items-center justify-between max-sm:w-full">
                          <LikeBtn item={item} />
                          <div className="">comment</div>
                        </div>
                        <div className=" max-sm:card-actions max-sm:justify-center max-sm:w-full">
                          <Link
                            href={item?.projectLink}
                            target="_blank"
                            className=""
                          >
                            <button className=" btn btn-primary">
                              View Project
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
          {/* ---------------------------------- */}
          <div className=" mt-10">
            <h1 className="text-3xl font-bold">Frontend Projects</h1>
              <motion.div className=" mt-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
              
              >
                <Swiper
                  pagination={true}
                  spaceBetween={50}
                  modules={[Pagination, Navigation]}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },

                    768: {
                      slidesPerView: 1,
                      spaceBetween: 30,
                    },

                    1024: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                  }}
                >
                  {AllProducts?.filter((item:any)=>item.projectType == "frontend")?.map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                      <motion.div
                        className="card  bg-base-100   "
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="card-body">
                          <div className=" w-full">
                            <Image
                              src={item?.projectImage}
                              alt="project"
                              width={500}
                              height={500}
                              priority
                              className=" object-cover w-full h-full rounded-sm"
                            />
                          </div>
                          <h1 className="card-title">{item?.projectTitle}</h1>
                          <p>{item?.descriptions}</p>

                          <div className="card-actions justify-between">
                            <div className=" flex items-center justify-between max-sm:w-full">
                              <LikeBtn item={item} />
                              <div className="">comment</div>
                            </div>
                            <div className=" max-sm:card-actions max-sm:justify-center max-sm:w-full">
                              <Link
                                href={item?.projectLink}
                                target="_blank"
                                className=""
                              >
                                <button className=" btn btn-primary">
                                  View Project
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
