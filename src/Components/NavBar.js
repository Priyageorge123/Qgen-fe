import { Transition } from "@tailwindui/react";
import { usePath } from "hookrouter";
import { navigate } from "hookrouter";
import { A } from "hookrouter";
import React, { useState } from "react";
// import logo from "../assets/navlogo.png";

export function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const path = usePath();
  const url = path === "/" ? "/home" : path;

  const navLink = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Question Repo",
      link: "/repo",
    },
    {
      name: "Generate Qns Paper",
      link: "/generate",
    },
  ];
  return (
    <nav className=" z-40 shadow">
      <div className=" mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* <div className="flex-shrink-0 sm:ml-6 flex items-center">
              <img className="block lg:hidden h-10 w-auto" src={logo} alt="" />
              <img className="hidden lg:block h-10 w-auto" src={logo} alt="" />
            </div> */}
            <div className="hidden  sm:flex">
              {navLink.map((item, i) => {
                const link = item.link === "/" ? "/home" : item.link;
                const isActive = url.includes(link);
                return (
                  <A
                    href={item.link}
                    className={`ml-8 inline-flex items-center  px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-indigo-500 focus:outline-none focus:text-gray-700 transition duration-150 ease-in-out ${
                      isActive ? "border-indigo-500" : ""
                    }`}
                  >
                    {item.name}
                  </A>
                );
              })}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={(_) => setNavOpen(!navOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={` ${
                    navOpen ? "hidden" : "inline-flex opacity-100 "
                  }`}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${!navOpen ? "hidden " : "inline-flex  "}`}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={navOpen}
        enter="transition origin-top-right ease-in-out duration-300 transform"
        enterFrom="scale-0"
        enterTo="scale-100"
        leave="transition origin-top-right ease-in-out duration-300 transform"
        leaveFrom="scale-100"
        leaveTo="scale-0 "
      >
        <div className=" absolute w-full z-40 bg-white sm:hidden">
          <div className="pt-2 z-40 pb-3">
            {navLink.map((item, i) => {
              const link = item.link === "/" ? "/home" : item.link;
              const isActive = url.includes(link);
              return (
                <button
                  key={i}
                  className={` block pl-3 z-40 pr-4 py-3 border-l-4 w-full text-left  border-transparent text-base font-medium   hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-indigo-300 transition duration-150 ease-in-out ${
                    !isActive
                      ? "text-gray-600 hover:border-gray-300 "
                      : " text-indigo-700 border-indigo-500 bg-indigo-50"
                  } `}
                  onClick={() => {
                    navigate(item.link);
                    setNavOpen(false);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </Transition>
    </nav>
  );
}
