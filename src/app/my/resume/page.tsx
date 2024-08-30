"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AllApiHandler } from "@/utils/redux/slices/slice";
import Back from "@/components/Back_Btn/back";
import Forword from "@/components/Forword_Btn/forwordBtn";

const ResumePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pdf = useSelector((state: any) => state?.Slice?.data?.pdf);
  useEffect(() => {
    dispatch(AllApiHandler());
  }, []);

  return (
    <main className="">
      <section className=" py-20 relative ">
        <Back />
        <Forword />
        <div className=" bg-base-100 shadow-xl rounded-lg overflow-hidden">
          <motion.div
            className="p-6 bg-gradient-to-r from-secondary to-primary text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl max-sm:text-4xl font-bold text-center">
              Hirock Dutta
            </h1>
            <p className="text-xl text-center mt-2">Full-Stack Web Developer</p>
          </motion.div>

          <div className="p-6">
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-lg max-sm:text-base ">
                Email: hirockdutta0@gmail.com
              </p>
              <p className="text-lg max-sm:text-base ">
                Phone: +88 01700-554293
              </p>
              <p className="text-lg max-sm:text-base ">
                Location: Jashore, Bangladesh
              </p>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-3xl max-sm:text-2xl font-semibold text-primary mb-4">
                Technical Skills
              </h2>
              <ul className="space-y-2 ">
                <li className=" bg-base-200 p-4 rounded-lg shadow-md">
                  HTML, CSS, JavaScript, TypeScript
                </li>
                <li className="bg-base-200 p-4 rounded-lg shadow-md">
                  React, Next.js, Tailwind CSS, DaisyUI
                </li>
                <li className="bg-base-200 p-4 rounded-lg shadow-md">
                  Node.js, Express, MongoDB, Mongoose
                </li>
                <li className="bg-base-200 p-4 rounded-lg shadow-md">
                  Git, GitHub, CI/CD
                </li>
                <li className="bg-base-200 p-4 rounded-lg shadow-md">
                  Framer Motion, GSAP for Animations
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-3xl max-sm:text-2xl font-semibold text-primary mb-4">
                Experience
              </h2>
              <div className="bg-base-200 p-4 rounded-lg shadow-md">
                <h3 className="text-2xl max-sm:text-xl font-bold">
                  Full-Stack Developer
                </h3>
                <p className="">Hirock Auto Mobile (2023 - Present)</p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>
                    Developed dynamic full-stack applications using Next.js,
                    React, Node.js, and MongoDB.
                  </li>
                  <li>
                    Implemented responsive and user-friendly UI with Tailwind
                    CSS and DaisyUI.
                  </li>
                  <li>
                    Integrated third-party APIs and services to enhance
                    application functionality.
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="text-3xl max-sm:text-2xl font-semibold text-primary mb-4">
                Education
              </h2>
              <div className="bg-base-200 p-4 rounded-lg shadow-md">
                <p className="text-2xl max-sm:text-xl font-bold">HSC</p>
                <p className="">Some College, Some University, 2024</p>
              </div>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h2 className="text-3xl max-sm:text-2xl font-semibold text-primary mb-4">
                Projects
              </h2>
              <div className="bg-base-200 p-4 rounded-lg shadow-md">
                <h3 className="text-2xl max-sm:text-xl font-bold">
                  Portfolio Website
                </h3>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>
                    Built a modern, responsive portfolio website using Next.js,
                    Tailwind CSS, and Framer Motion.
                  </li>
                  <li>
                    Showcased personal projects, skills, and experience with
                    animated elements and interactive UI.
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-lg ">
                Looking for new opportunities? Let’s connect!
              </p>

              <div className=" mt-4 flex items-center justify-center gap-5 max-md:flex-col">
                <button
                  onClick={() => toast.success("This is a good resume")}
                  className="btn btn-info btn-wide  "
                >
                  Contact Me
                </button>
                <button
                  className="btn btn-accent  btn-wide"
                  disabled={pdf?.pdf == undefined ? true : false}
                >
                  <Link
                    href={pdf?.pdf == undefined ? "" : pdf?.pdf}
                    target="_blank"
                    download={pdf?.pdf_name == undefined ? "" : pdf?.pdf_name}
                    className=" w-full h-full flex items-center justify-center"
                  >
                    DownLoad C.V
                  </Link>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResumePage;
