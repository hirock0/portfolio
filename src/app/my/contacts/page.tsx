"use client"

// pages/contact.js
import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { usePathname } from "next/navigation";
import Back from "@/components/Back_Btn/back";
import Forword from "@/components/Forword_Btn/forwordBtn";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with:", { name, email, message });
  };

  return (
    <main>
      <section className=" relative py-12">
        <Back/>
        <Forword/>

      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card w-full max-w-lg bg-base-100 shadow-2xl"
        >
          <div className="card-body">

            <h2 className="text-3xl font-bold text-center text-primary mb-6">
              Get In Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                Send Message
              </motion.button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-500">
              I will get back to you within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
      </section>
    </main>
  );
}
