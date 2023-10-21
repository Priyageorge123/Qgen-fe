import axios from "axios";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { url } from "../Common/url";
import Modal from "./Modal";

const options = [
  "Knowledge",
  "Comprehension",
  "Application",
  "Analysis",
  "Synthesis",
  "Evaluation",
];
const moduleOptions = [1, 2, 3, 4, 5, 6];
const initialForm = {
  question_text: "",
  level: "",
  module: "",
};
const FormEditor = ({ show, setShow, type, qId, onUpdate }) => {
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    if (type === "EDIT" && qId) {
      axios.get(`${url}api/questions/${qId}/`).then((res, err) => {
        setForm({
          question_text: res.data.question_text,
          level: res.data.level,
          module: res.data.module,
        });
      });
    } else if (type === "CREATE")
      setForm({ ...initialForm, module: 1, level: "Application" });
  }, [qId, type, show]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "EDIT") {
      axios.put(`${url}api/questions/${qId}/`, form).then((res, err) => {
        console.log("done");
        onUpdate();
        setShow(false);
      });
      return;
    }
    axios.post(`${url}api/questions/`, form).then((res, err) => {
      console.log("done");
      onUpdate();
      setShow(false);
    });
  };
  return (
    <Modal show={show} setShow={setShow}>
      <div className=" h-screenxx  px-4">
        <form onSubmit={handleSubmit} className="w-full py-10">
          <div className="p-4 ">
            <h2 className="text-2xl ">Question Information</h2>
            <p className="text-sm text-gray-500">
              Please fill this application.
            </p>
          </div>
          <div className="bg-gray-50 flex flex-wrap items-center border">
            <div className="flex flex-wrap w-full md:w-2/3 hover:bg-gray-100 border-r  md:space-y-0 space-y-1 p-4 sm:py-8 ">
              <p className="text-gray-600 w-full">Question</p>
              <TextareaAutosize
                value={form.question_text}
                autoFocus={true}
                name="question_text"
                className="p-2  w-full border border-blue-600 border-opacity-25 focus:border-opacity-100 focus:outline-none"
                onChange={handleChange}
                aria-label="minimum height"
                rowsMin={4}
                placeholder="Minimum 3 rows"
              />
            </div>
            <div className="flex flex-col divide-y w-full md:w-1/3  md:space-y-0   ">
              <div className="w-full  hover:bg-gray-100 md:space-y-0 space-y-1 p-4 ">
                <p className="text-gray-600 w-full">Module</p>
                <select
                  name="module"
                  onChange={handleChange}
                  value={form.module}
                  className="p-2 focus:outline-none border border-blue-600 border-opacity-25 focus:border-opacity-100 bg-white w-full"
                >
                  {moduleOptions.map((el) => (
                    <option value={el}>Module {el}</option>
                  ))}
                </select>
              </div>
              {type === "EDIT" && qId && (
                <div className=" w-full hover:bg-gray-100 md:space-y-0 space-y-1 p-4 ">
                  <p className="text-gray-600 w-full">Level</p>
                  <select
                    name="level"
                    onChange={handleChange}
                    value={form.level}
                    className="p-2 focus:outline-none border border-blue-600 border-opacity-25 focus:border-opacity-100 bg-white w-full"
                  >
                    {options.map((el) => (
                      <option value={el}>{el}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end pb-4 pt-2 ">
            <button
              onClick={(_) => setShow(false)}
              type="button"
              className="focus:outline-none modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white hover:bg-teal-400"
            >
              {type === "EDIT" ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormEditor;
