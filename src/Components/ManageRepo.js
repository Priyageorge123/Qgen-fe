import axios from "axios";
import React, { useState, useEffect } from "react";
import { url } from "../Common/url";
import FormEditor from "./FormEditor";
import EnhancedTable from "./TableContainer";

function ManageRepo() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [qId, setQId] = useState("");
  const fetchData = () => {
    axios.get(url + "api/questions/").then((res, err) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const createQuestion = () => {
    setType("CREATE");
    setShow(true);
    console.log("create");
  };
  const editQuestion = (id) => {
    setType("EDIT");
    setQId(id);
    setShow(true);
  };
  const clearAll = () => {
    setType("");
    setQId("");
    setShow(false);
  };
  const onUpdate = () => {
    fetchData();
    clearAll();
  };
  const onRemove = async (ids) => {
    console.log(ids);
    await ids.forEach(async (id) => {
      await axios.delete(`${url}api/questions/${id}/`);
      onUpdate();
    });
  };
  return (
    <div className="mx-2  mt-10">
      <div className="w-full max-w-7xl mx-auto  flex justify-center overflow-x-auto  ">
        <EnhancedTable
          rows={data}
          editQuestion={editQuestion}
          onRemove={onRemove}
          createQuestion={createQuestion}
        />
      </div>
      <FormEditor
        type={type}
        qId={qId}
        show={show}
        setShow={clearAll}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default ManageRepo;
