"use client";
import Link from "next/link";
import Style from "./nav.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { GoX } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiAdjustBrightness } from "react-icons/ti";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { IoHomeOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GiNetworkBars } from "react-icons/gi";

const Nav = () => {
  const router = useRouter();
  const sessionData = useSession();
  const user = sessionData?.data?.user;
  const [loggedUser, setLoggedUser] = useState({
    name: "",
    userImg: "",
    email: "",
    userId: "",
  });
  const [logoutFlag, setLogoutFlag] = useState(false);

  const [themeFlag, setThemeFlag] = useState(false);
  const [hambFlag, setHambFlag] = useState(false);
  const pathname = usePathname();
  const DefaultTheme = () => {
    if (!themeFlag) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  const windowEvent = () => {
    window.addEventListener("click", () => {
      setHambFlag(false);
    });
  };

  const LoggedUser = useCallback(async () => {
    try {
      const reqData = await axios.get("/pages/api/user/login");
      const User = reqData?.data?.findUser;
      setLoggedUser({
        ...loggedUser,
        name: User?.name,
        userImg: User?.userImg,
        email: User?.email,
        userId: User?._id,
      });
    } catch (error: any) {
      throw new Error("something went wrong", error);
    }
  }, [loggedUser]);

  const onLogout = async () => {
    try {
      const logout = await axios.get("/pages/api/user/logout");
      if (logout?.data.success) {
        toast.success(logout?.data.message);
        setLogoutFlag(false);
        router.push("/");
      } else {
        toast.success(logout?.data.message);
      }
    } catch (error: any) {
      throw new Error("Something went wrong", error);
    }
  };

  useEffect(() => {
    DefaultTheme();
    windowEvent();
    LoggedUser();
  }, [themeFlag]);

  return (
    <nav
      className={` h-20 border-b-2 border-b-base-300 sticky top-0 z-50 backdrop:filter backdrop-blur-3xl`}
    >
      <section
        className={`flex items-center justify-between h-full w-full gap-5`}
      >
        {/* left_start */}

        <div className="">
          <button
            onClick={(e) => {
              e.stopPropagation(), setHambFlag(!hambFlag);
            }}
            className=" flex items-center justify-center cursor-pointer lg:hidden"
          >
            <RxHamburgerMenu
              className={`${!hambFlag ? "block" : "hidden"}`}
              size={25}
            />
            <GoX className={`${!hambFlag ? "hidden" : "block"}`} size={25} />
          </button>

          <div className=" max-lg:hidden flex items-center justify-center">
            <Image
              src={"/images/company_logo.jpg"}
              priority
              alt="logo"
              width={40}
              height={40}
              className=" rounded-lg"
            />
          </div>
        </div>

        {/* left_start */}

        {/* -------------------------------------------- */}

        {/* middle_start */}

        {/* middle_end */}

        {/* -------------------------------------------------- */}

        {/* right_start */}

        <ul className=" flex items-center gap-5 max-sm:gap-2 ">
          <li onClick={(e) => e.stopPropagation()} className=" ">
            <ul
              className={` ${Style.NavRightUl} ${
                !hambFlag ? "max-lg:-translate-x-full" : "max-lg:translate-x-0"
              } transition-all flex gap-5   max-lg:fixed max-lg:left-0 max-lg:top-20  max-lg:menu max-lg:menu-dropdown max-lg:bg-base-100 max-lg:rounded-b-lg max-lg:p-5 max-lg:flex-col max-lg:shadow max-lg:shadow-current`}
            >
              <motion.li
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Link href={"/"}>Home</Link>
              </motion.li>

              <motion.li
                className={`${
                  pathname == "/my/services" ? "text-yellow-600" : null
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Link href={"/my/services"}>Services</Link>
              </motion.li>
              <motion.li
                className={`${
                  pathname == "/my/resume" ? "text-yellow-600" : null
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <Link href={"/my/resume"}>Resume</Link>
              </motion.li>
              <motion.li
                className={`${
                  pathname == "/my/contacts" ? "text-yellow-600" : null
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Link href={"/my/contacts"}>Contacts</Link>
              </motion.li>
              {loggedUser?.email == undefined ? (
                <motion.li
                  className={`${
                    pathname == "/my/login" ? "text-yellow-600" : null
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <Link href={"/my/login"}>login</Link>
                </motion.li>
              ) : null}
            </ul>
          </li>

          {/* ----------------------------- */}

          {loggedUser?.email !== undefined ? (
            <li className="flex items-center justify-center">
              <div className="drawer drawer-end">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                />

                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer-4" className="drawer-button ">
                    <div className="avatar online">
                      <div className="w-10 h-10 rounded-full">
                        <Image
                          src={user?.image?.toString() || loggedUser?.userImg}
                          priority
                          alt="user"
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>
                  </label>
                </div>

                <div className="drawer-side z-10 mt-20">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>

                  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <div className=" flex items-center justify-center border-b-2 mb-5 pb-5">
                      <div className=" flex flex-col items-center">
                        {/* -------------------- */}
                        <div className="avatar online">
                          <div className="w-20 h-20 rounded-full">
                            <Image
                              src={
                                user?.image?.toString() || loggedUser?.userImg
                              }
                              priority
                              alt="user"
                              width={500}
                              height={500}
                            />
                          </div>
                        </div>
                        <div className="">
                          <h1 className="mt-3 text-center">
                            {user?.name?.toString() || ""}
                          </h1>
                          <h1 className=" text-center">
                            {user?.email?.toString() || ""}
                          </h1>
                        </div>

                        {/* ---------------------- */}
                      </div>
                    </div>
                    {/* ---- */}

                    <li className="  ">
                      <Link href={"#"}>
                        <IoHomeOutline className=" w-5 h-5" />
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"}>
                        <IoInformationCircleOutline className=" w-5 h-5" />
                        <span>Informations</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"}>
                        <GiNetworkBars className=" w-5 h-5" />
                        <span>Networks</span>
                      </Link>
                    </li>

                    <li className=" bg-base-300 ">
                      {/* Sidebar content here */}
                      <button
                        onClick={() =>
                          setTimeout(() => {
                            sessionData?.data == null
                              ? onLogout()
                              : signOut({ redirect: true, callbackUrl: "/" });
                            setLogoutFlag((prev) => !prev);
                          }, 2000)
                        }
                        className=""
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                  {/* ----------------------------------------------- */}
                </div>
              </div>
            </li>
          ) : null}
          {/* ----------------------------- */}

          <li>
            <div className="flex items-center">
              <button onClick={() => setThemeFlag(!themeFlag)}>
                <TiAdjustBrightness size={25} />
              </button>
            </div>
          </li>
        </ul>
        {/* right_end */}
      </section>
    </nav>
  );
};

export default Nav;
