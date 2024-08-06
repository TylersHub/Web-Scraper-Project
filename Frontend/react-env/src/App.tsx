import React from "react";
import Button from "./components/Button";
import InputBox from "./components/InputBox";

const App = () => {
  return (
    <div>
      <p className="text-center fs-1 fw-semibold">Web Scraper</p>
      <InputBox inputLabel="Search Bar" inputPlaceholder="Search" />
      <Button />
    </div>
  );
};

export default App;
