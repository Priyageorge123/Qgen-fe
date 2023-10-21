import { navigate } from "hookrouter";
import React from "react";

function Repo() {
  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className=" bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div className=" text-white flex w-16 h-16 rounded-full items-center justify-center -mt-6  bg-pink-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2">Cryptography</p>
              <div className="flex space-x-2 text-gray-400 text-sm my-3">
                <p>28 Questions</p>
              </div>

              <div className="border-t-2"></div>

              <div className="flex justify-between">
                <button
                  onClick={(_) => navigate("/repo/1")}
                  className="w-full mx-4 outline-none focus:outline-none bg-blue-600 text-white font-medium p-2 mt-4 rounded-md"
                >
                  View/Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Repo;
