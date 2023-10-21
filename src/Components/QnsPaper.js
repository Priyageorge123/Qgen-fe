import React, { useState } from "react";
import ChartComponent from "./ChartComponent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
const QnsPaper = ({ form, modules, data, setStatus }) => {
  const partA = data.filter((el) => el.part === "A");
  const partB = data.filter((el) => el.part === "B");
  const partC = data.filter((el) => el.part === "C");
  return (
    <div className=" w-full bg-gray-200 min-h-screenx justify-center">
      <div className=" mx-auto flex-col w-full -mb-6 max-w-4xl">
        <IconButton onClick={(_) => setStatus("GENERATE")}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="p-10 flex mx-auto flex-col w-full my-10 bg-white max-w-4xl">
        <h1 className="text-center font-semibold uppercase text-xl">
          {form.university}
        </h1>
        <h1 className="text-center uppercase mt-2 text-xl">
          First Internal Exam, {form.month} {form.year}{" "}
        </h1>
        <h1 className="text-center mt-6 font-semibold ">
          Course Code: {form.code || "CS254"}
        </h1>
        <h1 className="text-center font-semibold ">
          Course Name: {form.subject || ""}
        </h1>
        <div className="flex w-full text-sm mt-4 justify-between">
          <span>Max. Mark: 20</span>
          <span>Duration: 1 Hour</span>
        </div>
        <h1 className="text-center font-bold ">PART A</h1>
        <div className="flex w-full text-sm mt-2">
          <div className="w-full italic font-bold  text-center -mr-10 ">
            Answer all questions, each carry 4 marks
          </div>
          <span className="font-semibold">Mark</span>
          <span className="font-semibold px-1">BL</span>
          <span className="font-semibold">Mod</span>
        </div>
        {partA.map((el, i) => (
          <div className="flex w-full text-sm mt-4">
            <div className="w-full flex ">
              <span className="pr-4">{i + 1}.</span> {el.question_text}
            </div>
            <span className="whitespace-nowrap">( {3} )</span>
            <span className="whitespace-nowrap px-3">
              {el.level.slice(0, 2)}
            </span>
            <span className="whitespace-nowrap"> ( {el.module} ) </span>
          </div>
        ))}
        <h1 className="text-center font-bold mt-6 ">PART B</h1>

        <div className="flex w-full text-sm mt-2">
          <div className="w-full italic font-bold  text-center -mr-10 ">
            Answer any two questions
          </div>
          <span className="font-semibold"></span>
        </div>
        {partB.map((el, i) => (
          <div className="flex w-full text-sm mt-4">
            <div className="w-full flex ">
              <span className="pr-4">{partA.length + i + 1}.</span>{" "}
              {el.question_text}
            </div>
            <span className="whitespace-nowrap">( {4} )</span>
            <span className="whitespace-nowrap px-3">
              {el.level.slice(0, 2)}
            </span>
            <span className="whitespace-nowrap"> ( {el.module} ) </span>
          </div>
        ))}
        <h1 className="text-center font-bold mt-6 ">PART C</h1>

        <div className="flex w-full text-sm mt-2">
          <div className="w-full italic font-bold  text-center -mr-10 ">
            (Optional, those who attempt shall be given due credit)
          </div>
          <span className="font-semibold"></span>
        </div>
        {partC.map((el, i) => (
          <div className="flex w-full text-sm mt-4">
            <div className="w-full flex ">
              <span className="pr-4">
                {partA.length + partB.length + i + 1}.
              </span>{" "}
              {el.question_text}
            </div>
            <span className="whitespace-nowrap">( {2} )</span>
            <span className="whitespace-nowrap px-3">
              {el.level.slice(0, 2)}
            </span>
            <span className="whitespace-nowrap"> ( {el.module} ) </span>
          </div>
        ))}
        <hr className="text-gray-400 mt-20" />
        <div className="text-center  my-6  font-semibold mb-6 text-gray-600 ">
          Question Paper Analysis
        </div>
        <hr className="text-gray-400" />
        <span className="text-left mr-auto flex font-semibold mb-6 text-gray-600 mt-6 pb-2">
          <li>Overall Level Analysis</li>
        </span>
        {/* Chart */}
        <ChartComponent
          data={data}
          form={form}
          modules={modules}
          chartId={"chart1"}
          labels={[
            "Knowledge",
            "Comprehension",
            "Application",
            "Analysis",
            "Synthesis",
            "Evaluation",
          ]}
        />
        <span className="text-left mr-auto flex font-semibold text-gray-600 mt-10 pb-2">
          <li>Modulewise Level Analysis</li>
        </span>
        <div className="flex w-full flex-wrap ">
          {modules.map((el, i) => {
            const chartData = data.filter((d) => d.module == el);

            return chartData.length ? (
              <div className="w-1/2 mt-10 justify-center">
                <div className="text-lg pl-6 pb-4 text-gray-600">
                  Module {el}
                </div>
                <div className="flex w-full justify-center">
                  <ChartComponent
                    key={i}
                    data={chartData}
                    modules={modules}
                    form={form}
                    chartId={"chart" + i + 1}
                    labels={[
                      "Knowledge",
                      "Comprehension",
                      "Application",
                      "Analysis",
                      "Synthesis",
                      "Evaluation",
                    ]}
                  />
                </div>
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QnsPaper;
