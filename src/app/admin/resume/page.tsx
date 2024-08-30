"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const ResumePage = () => {
  const [pdfData, setPdfData] = useState({
    pdf_name: "",
    pdf: "",
    recentDate: "",
  });
  const onUploadPdf = async (e: any) => {
    e.preventDefault();
    pdfData.recentDate = new Date().toLocaleDateString();
    const sendPdf = await axios.post("/pages/api/resume_pdfs", pdfData);
  };

  const base64 = (data: any) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(data.target.files[0]);

      reader.onload = (result: any) => {
        setPdfData({ ...pdfData, pdf: result.target.result });
      };
      reader.onerror = (errors: any) => {
        throw new Error("something went wrong", errors);
      };
    } catch (error: any) {
      throw new Error("something went wrong", error);
    }
  };

  return (
    <section className=" flex justify-center">
      <div className=" w-full border  mt-10">
        <h1 className=" text-center">Upload Resume</h1>
        <form onSubmit={onUploadPdf} className=" mt-5 w-full">
          <div className=" w-full">
            <h1 className=" mb-5">Pfd Name</h1>

            <input
              value={pdfData.pdf_name}
              onChange={(e) =>
                setPdfData({ ...pdfData, pdf_name: e.target.value })
              }
              type="text"
              placeholder="Pdf Name"
              name="pdf_name"
              id="pdf_name"
              className=""
            />
          </div>
          <div className=" w-full mt-5">
            <h1 className=" mb-5">resume</h1>
            <label htmlFor="resume" className=" border px-10">
              choose your pdf
            </label>

            <input
              onChange={base64}
              type="file"
              accept="pdf/**"
              name="resume"
              id="resume"
              className="hidden"
            />
          </div>
          <div className="">
            <h1>PDF Viewer</h1>
            <div className=" h-62 ">
              <embed
                src={pdfData.pdf}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                aria-label="PDF Viewer"
              />
            </div>
          </div>

          <div className=" flex justify-center mt-5">
            <button className=" btn btn-ghost bg-accent text-base-100">
              upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResumePage;
