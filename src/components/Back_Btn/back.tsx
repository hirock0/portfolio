"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
const Back = () => {
  const router = useRouter();
  return (
    <motion.button
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={() => router.back()}
      className=" btn btn-circle absolute left-2 top-2  "
    >
      <GoArrowLeft size={20} className="" />
    </motion.button>
  );
};

export default Back;
