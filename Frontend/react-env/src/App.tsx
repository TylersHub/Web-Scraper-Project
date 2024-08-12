import React from "react";
import Button from "./components/Button";
import InputBox from "./components/InputBox";
import ProductCard from "./components/ProductCard";
import DatabaseComp from "./components/DatabaseComp";
import { useState } from "react";

const App = () => {
  const [Visible, setVisible] = useState(false);

  return (
    <div>
      <p className="text-center fs-1 fw-semibold">Web Scraper</p>
      <InputBox inputLabel="Search Bar" inputPlaceholder="Search" />
      <ProductCard id={1} name="Product1" image="" url="" />
      <Button btnName="DB Load" btnClick={() => setVisible(true)} />
      {Visible && <DatabaseComp />}
    </div>
  );
};

export default App;
