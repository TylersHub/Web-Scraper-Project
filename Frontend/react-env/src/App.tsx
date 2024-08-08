import React from "react";
import Button from "./components/Button";
import InputBox from "./components/InputBox";
import ProductCard from "./components/ProductCard";

const App = () => {
  return (
    <div>
      <p className="text-center fs-1 fw-semibold">Web Scraper</p>
      <InputBox inputLabel="Search Bar" inputPlaceholder="Search" />
      <ProductCard id={1} name="Product1" image="" url="" />
      <Button />
    </div>
  );
};

export default App;
