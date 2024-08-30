import HomePage from "@/components/home_page/homePage";

const Home = () => {
  return (
    <main className=" py-10">
      <section>
        <HomePage />
        <div className="">
          <h1 className=" text-center text-3xl font-semibold max-md:text-2xl max-sm:text-xl">My Portfolio Descriptions</h1>
          <p className=" mt-5 lg:w-4/6 mx-auto text-center">
             As a passionate full-stack web developer, I specialize in building dynamic and responsive applications with a modern tech stack. Proficient in React and Next.js, I create seamless user interfaces that offer a smooth and engaging user experience. I leverage Mongoose for robust database management and Redux Toolkit for efficient state management in complex applications. My designs are crafted with Tailwind CSS and DaisyUI, ensuring visually appealing, responsive layouts that stand out. By integrating various libraries and tools, I continuously deliver high-quality, maintainable, and scalable web solutions tailored to meet client needs.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
