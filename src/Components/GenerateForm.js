import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QnsPaper from "./QnsPaper";
import QnsPaperEditor from "./QnsPaperEditor";

const initialState = {
  subject: "",
  university: "APJ Abdul Kalam Technological University",
  branch: "Computer Science and Engineering",
  year: "2021",
  month: "May",
  semester: "Eighth Semester",
};
const initialError = {
  subject: false,
  university: false,
  branch: false,
  year: false,
  month: false,
  semester: false,
};
const semester = [
  "First Semester",
  "Second Semester",
  "Third Semester",
  "Fourth Semester",
  "Fifth Semester",
  "Sixth Semester",
  "Seventh Semester",
  "Eighth Semester",
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const moduleList = {
  1: true,
  2: true,
  3: true,
  4: false,
  5: false,
  6: false,
};
const FormModel = ({
  handleChange,
  handleSubmitForm,
  form,
  error,
  modules,
  setModules,
}) => {
  console.log(modules);

  return (
    <form
      onSubmit={handleSubmitForm}
      autoComplete="on"
      className="w-full flex flex-wrap py-10"
    >
      <div className="w-full flex  justify-around gap-4 p-2">
        <TextField
          id={"standard-basic1"}
          label="Course Name"
          name="subject"
          error={error.subject}
          value={form.subject}
          className="w-1/3"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic2"
          label="University Name"
          name="university"
          error={error.university}
          value={form.university}
          className="w-1/3"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex  justify-around gap-4 p-2">
        <TextField
          id="standard-basic3"
          label="Branch Name"
          name="branch"
          error={error.branch}
          value={form.branch}
          className="w-1/3"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic4"
          label="Year"
          name="year"
          error={error.year}
          value={form.year}
          className="w-1/3"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex  justify-around gap-4 p-2">
        <FormControl className="w-1/3">
          <InputLabel error={error.month} id="demo-simple-select-label5">
            Month
          </InputLabel>
          <Select
            labelId="demo-simple-select-label5"
            id="demo-simple-select"
            name="month"
            value={form.month}
            className="w-full"
            onChange={handleChange}
          >
            {month.map((el) => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="w-1/3">
          <InputLabel error={error.semester} id="demo-simple-select-label6">
            Semester
          </InputLabel>
          <Select
            labelId="demo-simple-select-label6"
            id="demo-simple-select"
            name="semester"
            value={form.semester}
            className="w-full"
            onChange={handleChange}
          >
            {semester.map((el) => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full  flex flex-wrap justify-center mt-4 gap-x-4 p-2">
        <FormGroup row>
          {Object.keys(modules).map((el, i) => (
            <FormControlLabel
              key={el}
              control={
                <Checkbox
                  checked={modules[el]}
                  color="primary"
                  onChange={(event) => {
                    setModules({ ...modules, [el]: event.target.checked });
                  }}
                  name={el}
                />
              }
              label={"Module " + el}
            />
          ))}
        </FormGroup>
        <div className="flex w-full justify-center">
          <FormHelperText>Please select the modules</FormHelperText>
        </div>
      </div>
      <div className="w-full flex  justify-around gap-4 p-2">
        <Button type="submit" variant="contained" color="primary">
          Generate
        </Button>
      </div>
    </form>
  );
};

const GenerateForm = () => {
  const [status, setStatus] = useState("FORM");
  const [form, setForm] = useState(initialState);
  const [finalForm, setFinalForm] = useState({});
  const [dataToDrag, setDataToDrag] = useState({});

  const [modules, setModules] = useState(moduleList);
  const [error, setErrors] = useState(initialError);
  const [data, setData] = useState([]);

  useEffect(() => {
    return () => setErrors({ ...initialError });
  }, []);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    let errors = initialError;
    let flag = 0;
    Object.keys(error).forEach((el) => {
      console.log(el, form[el]);
      if (form[el] === "" || form[el] === " ") {
        errors[el] = true;
        flag = 1;
      } else {
        errors[el] = false;
      }
    });
    if (flag === 0) {
      axios
        .post("http://localhost:8000/api/generateQuestions/", {
          modules: Object.keys(modules).filter((el) => modules[el] === true),
        })
        .then((res, err) => {
          setDataToDrag(res.data);
          let temp = [];
          res.data.partA.forEach((el) => {
            temp = [...temp, { ...el, part: "A", mark: parseInt(el.mark) }];
          });
          res.data.partB.forEach((el) => {
            temp = [...temp, { ...el, part: "B", mark: parseInt(el.mark) }];
          });
          res.data.partC.forEach((el) => {
            temp = [...temp, { ...el, part: "C", mark: parseInt(el.mark) }];
          });
          console.log("Datatttt", temp);
          setData(temp);
          setStatus("GENERATE");
        })
        .catch((err) =>
          window.alert(
            "Questions are not sufficient to create Question Paper. Please add more questions"
          )
        );
      console.log(errors);
    }
    setErrors({ ...errors });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (value === "" || value === " ") setErrors({ ...error, [name]: true });
    else setErrors({ ...error, [name]: false });
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleContinue = async (data) => {
    let temp = [];
    data.partA.forEach((el) => {
      temp = [...temp, { ...el, part: "A", mark: parseInt(el.mark) }];
    });
    data.partB.forEach((el) => {
      temp = [...temp, { ...el, part: "B", mark: parseInt(el.mark) }];
    });
    data.partC.forEach((el) => {
      temp = [...temp, { ...el, part: "C", mark: parseInt(el.mark) }];
    });
    console.log("Datatttt", temp);
    setData(temp);
    await setStatus("COMPLETE");
  };
  console.log(data);
  return status === "FORM" ? (
    <div className="mx-2  mt-10">
      <div className="w-full max-w-5xl mx-auto  flex justify-center overflow-x-auto  ">
        <FormModel
          handleChange={handleChange}
          handleSubmitForm={handleSubmitForm}
          modules={modules}
          setModules={setModules}
          form={form}
          error={error}
        />
      </div>
    </div>
  ) : status === "GENERATE" ? (
    <QnsPaperEditor
      setStatus={setStatus}
      data={dataToDrag}
      handleContinue={handleContinue}
    />
  ) : (
    <QnsPaper
      form={form}
      data={data}
      setStatus={setStatus}
      modules={Object.keys(modules).filter((el) => modules[el] === true)}
    />
  );
};

export default GenerateForm;
