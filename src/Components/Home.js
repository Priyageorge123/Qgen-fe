import { A } from "hookrouter";
import React from "react";

function Home() {
  return (
    <div className="w-full ">
      <section className="min-h-screenx px-12 sm:px-24 flex items-center ">
        <div className="grid grid-cols-1 gap-6 ">
          <div className="">
            <div className="w-full">
              <h1 className="text-5xl  lg:text-7xl text-black font-bold my-8">
                Let's create an
                <br />
                AI based <span className="text-blue-700 ">Question Repo</span>
              </h1>
              <p className="text-xl text-black font-semibold ">
                Become the best in your industry!
                <br /> Start today our universal quik start program
              </p>
            </div>
          </div>
          <div className=" py-6 ">
            <div className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <A
                className="py-4 px-8 bg-blue-700 text-white font-semibold"
                href="/repo"
              >
                Go to repo
              </A>
            </div>
          </div>
          <div className="absolute bottom-0 py-6 px-6 right-0">
            <div className="flex space-x-6">
              <i className="fa fa-dribbble text-white fa-lg"></i>
              <i className="fa fa-twitter text-white fa-lg"></i>
              <i className="fa fa-facebook text-white fa-lg"></i>
              <i className="fa fa-instagram text-white fa-lg"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
