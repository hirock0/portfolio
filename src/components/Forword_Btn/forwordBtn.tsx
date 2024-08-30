"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
const Forword = () => {
  const router = useRouter();
  // console.log(router.forward())

  return (
    <motion.button
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={() => router.forward()}
      className=" btn btn-circle absolute right-2 top-2  "
    >
      <GoArrowRight size={20} className="" />
    </motion.button>
  );
};

export default Forword;
