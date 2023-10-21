import { Transition } from "@tailwindui/react";
import React from "react";

const Modal = ({ children, show = true, setShow }) => {
  return (
    <Transition
      show={show}
      enter="transition  ease-in-out duration-300 "
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition  ease-in-out duration-300 "
      leaveFrom="opacity-100"
      leaveTo="opacity-0 "
    >
      <div className="bg-black bg-opacity-25 fixed w-full inset-0 z-20 overflow-hidden flex flex-col justify-center items-center animated fadeIn faster">
        <div
          onClick={(_) => setShow(false)}
          className="bg-black bg-opacity-25 fixed w-full inset-0 z-20 overflow-hidden flex flex-col justify-center items-center animated fadeIn faster"
        ></div>
        <div className="flex  justify-end w-full md:w-10/12 pb-2 items-center">
          <div className="modal-close cursor-pointer">
            <svg
              className="fill-current text-white font-bold w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>
        <div className="border pb-10 flex flex-col border-teal-500 modal-container bg-white w-full md:w-10/12 mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="text-left ">
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
