import React from "react";
import Button from "./components/Button";
import InputBox from "./components/InputBox";
import ProductCard from "./components/ProductCard";
import DatabaseComp from "./components/DatabaseComp";
import { useState } from "react";

const App = () => {
  const [Visible, setVisible] = useState(false);

  return (
    <div className="row container-fluid">
      <div className="col-12">
        <p className="text-center fs-1 fw-semibold">Web Scraper</p>
      </div>
      <div className="col-12">
        <InputBox inputLabel="Search Bar" inputPlaceholder="Search" />
      </div>
      <div className="col-12 pb-2">
        <ProductCard
          id={1}
          name="Product1 (Testing Purposes)"
          image=""
          url=""
        />
      </div>
      <div className="col-12">
        <Button btnName="DB Load" btnClick={() => setVisible(true)} />
      </div>
      <div className="col-12">{Visible && <DatabaseComp />}</div>
    </div>
  );
};

export default App;
