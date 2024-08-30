"use client";
import { useForm } from "react-hook-form";
import Style from "./login.module.css";
import { BsGoogle } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [policy, setPolicy] = useState(false);

  const onFormData = async (LoginData: any) => {
    try {
      LoginData.password = password;
      const res = await signIn("credentials", {
        redirect: false,
        email: LoginData.email,
        password: LoginData.password,
      });
      if (!res?.ok) {
        toast.success("password or email incorrect");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      throw new Error("something went wrong", error);
    }
  };

  const googleAuth = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className={`${Style.main} pb-10 `}>
      <section className=" mt-5">
        <div className="flex gap-2  max-md:flex-col-reverse  ">
          <div
            className={`${
              Style.left_Section
            }  overflow-hidden rounded-md  w-full max-md:${
              !policy ? "h-[60vh]" : "h-full"
            } `}
          >
            <div
              className={`${
                !policy ? "hidden" : "block"
              } p-5 bg-slate-800/80 h-full w-full`}
            >
              <h1 className=" text-center text-2xl">Policy</h1>
              <p className={`mt-5 text-white`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                voluptatem, autem voluptates asperiores et aperiam ut earum
                molestiae doloribus beatae sapiente rem? Dignissimos rerum in
                error non quia corrupti debitis? Atque quasi sequi velit, beatae
                rerum, saepe architecto ex explicabo, quis perspiciatis
                aspernatur aliquam magnam. Repellendus numquam incidunt ab aut
                accusamus atque quis provident vitae delectus? Ratione
                reprehenderit pariatur maxime! Voluptas debitis minima, ex ullam
                nobis labore odit, sint illum perferendis non rem excepturi,
                quaerat ipsum libero fuga maiores earum aspernatur veniam
                facilis repellat ipsam modi enim? Deleniti, nemo in!
                Necessitatibus voluptas repellat, ad facere voluptatibus
                voluptate tenetur, facilis ducimus incidunt odio nesciunt vitae
                vero? Cumque, odit alias vitae dicta officiis magni a hic ea?
                Eveniet asperiores architecto quasi non? Dignissimos iure
                laborum porro sed assumenda ullam voluptatibus neque molestias
                mollitia deleniti. Nulla, fuga neque. Voluptatibus, consequuntur
                natus, dolor asperiores ad explicabo sed enim veniam vitae
                quisquam minus ea itaque.
              </p>
            </div>
          </div>
          {/* ---------------------------------------------- */}
          <div className=" relative w-full md:w-4/6 bg-white rounded-md overflow-hidden text-black  ">
            <button
              onClick={() => router.forward()}
              className=" rotate-180 absolute right-5 top-7"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
              </svg>
            </button>
            <h1 className="text-center text-2xl mt-5 font-semibold text-slate-500">
              Login
            </h1>
            <div className={`${Style.loginDiv} bg-slate-100 pb-10 p-5 mt-5 `}>
              <Image
                src={"/assets/looking-inp.png"}
                alt="looking"
                width={50}
                height={50}
                className={` transition-all`}
                style={{
                  transform: `rotate(${
                    password.length * 5 < 80 ? -password.length * 5 : null
                  }deg)`,
                }}
              />
              <form
                onSubmit={handleSubmit((data) => onFormData(data))}
                className="  mt-5  overflow-hidden "
              >
                <div className="  mt-4">
                  <h1>Email</h1>
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className=" w-full h-10 rounded-sm border pl-5 outline-none mt-2"
                  />
                  {errors.email && (
                    <p className=" text-center">
                      {errors.email?.message?.toString()}
                    </p>
                  )}
                </div>
                <div className=" mt-4  ">
                  <h1>Password</h1>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={`${!checkPassword ? "password" : "text"}`}
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className=" w-full h-10 rounded-sm border pl-5 outline-none mt-2"
                  />
                  {password.length == 0 ? (
                    <p className="text-center">Password required</p>
                  ) : null}
                  <input
                    onChange={() => setCheckPassword(!checkPassword)}
                    type="checkbox"
                    className="mt-2"
                  />
                </div>

                <div className=" mt-4  ">
                  <button
                    type="submit"
                    className="h-10 rounded-sm border pl-5 mt-2 w-full bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className=" ">
                {/* divider_start */}

                <div className=" flex items-center mt-5">
                  <div className=" w-full border"></div>
                  <div className=" text-nowrap mr-5 ml-5">login with</div>
                  <div className=" w-full border"></div>
                </div>
                {/* divider_end */}
                <div className=" mt-5 flex gap-5 ">
                  <div className=" w-1/2 flex items-center justify-center">
                    <button
                      onClick={googleAuth}
                      className=" flex items-center justify-center  w-full h-12 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-sm"
                    >
                      <BsGoogle className=" text-white w-6 h-6" />
                    </button>
                  </div>
                  <div className=" w-1/2  flex items-center justify-center">
                    <button className=" flex items-center justify-center  w-full h-12 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-sm">
                      <BsGithub className=" text-white w-6 h-6" />
                    </button>
                  </div>
                </div>
                {/* create_new_section_start */}

                <div className="  mt-5">
                  <div className="flex items-center justify-center">
                    <Link
                      href={"/my/signup"}
                      className=" underline underline-offset-4 hover:text-yellow-600 active:text-yellow-700 "
                    >
                      Create New Account
                    </Link>
                  </div>

                  {/* policy+forget password_start */}
                  <div className=" mt-5 flex items-center justify-between">
                    <div className="">
                      <button
                        onClick={() => setPolicy(!policy)}
                        className=" hover:text-yellow-600 active:text-yellow-700 "
                      >
                        Policy
                      </button>
                    </div>
                    <div className=" ">
                      <Link
                        href={"/user/forgot_password"}
                        className=" hover:text-yellow-600 active:text-yellow-700 "
                      >
                        forgot password?
                      </Link>
                    </div>
                  </div>
                  {/* policy+forget password_start */}
                </div>

                {/* create_new_section_end */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
