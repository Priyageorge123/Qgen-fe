import { Navbar } from "./Components/NavBar";
import React from "react";
import { useRoutes } from "hookrouter";
import Home from "./Components/Home";
import Repo from "./Components/Repo";
import ManageRepo from "./Components/ManageRepo";
import GenerateForm from "./Components/GenerateForm";
import QnsPaperEditor from "./Components/QnsPaperEditor";

const roots = {
  "/": () => <Home />,
  "/repo": () => <Repo />,
  "/repo/:id": ({ id }) => <ManageRepo id={id} />,
  "/generate": () => <GenerateForm />,
  "/t": () => <QnsPaperEditor />,
};
function App() {
  const pages = useRoutes(roots);
  return (
    <div className="w-full">
      <Navbar />
      <div className="min-h-screenx w-full">{pages}</div>
    </div>
  );
}

export default App;
