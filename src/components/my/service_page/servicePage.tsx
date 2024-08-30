"use client";
// components/ServiceCard.jsx
import { motion } from "framer-motion";

interface Props {
  title: any;
  description: any;
  icon: any;
}
const ServiceCard: React.FC<Props> = ({ title, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white shadow-lg rounded-lg p-6 "
  >
    <div className="flex items-center space-x-4">
      <div className="text-blue-500">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="mt-4 text-gray-600">{description}</p>
  </motion.div>
);

export default ServiceCard;
