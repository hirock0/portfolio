"use client";

import Back from "@/components/Back_Btn/back";
import Forword from "@/components/Forword_Btn/forwordBtn";
// pages/services.js
import { motion } from "framer-motion";
import Head from "next/head";

const services = [
  {
    title: "Web Development",
    description:
      "We craft high-performance, responsive, and dynamic websites tailored to your business needs using the latest technologies.",
    icon: "🌐",
  },
  {
    title: "E-commerce Solutions",
    description:
      "Our e-commerce solutions are designed to boost your online sales, with seamless shopping experiences for your customers.",
    icon: "🛒",
  },
  {
    title: "SEO Optimization",
    description:
      "Optimize your website for better search engine rankings to increase traffic, improve visibility, and drive more leads.",
    icon: "🚀",
  },
  {
    title: "Custom Web Applications",
    description:
      "We build custom web applications that are tailored to solve specific business challenges, using cutting-edge technologies.",
    icon: "🛠️",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <main>
      <section className=" relative">
        <Back />
        <Forword />
        <Head>
          <title>Our Services</title>
          <meta
            name="description"
            content="Explore the wide range of services we offer to elevate your business."
          />
        </Head>
        <div className=" py-16 bg-base-200">
          <div className=" text-center">
            <h2 className="text-4xl font-bold text-primary mb-12">
              Our Services
            </h2>
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="card-body items-center text-center">
                    <div className="text-6xl">{service.icon}</div>
                    <h3 className="card-title text-2xl mt-4">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-base">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
