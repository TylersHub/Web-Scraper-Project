// KEEP IN MIND REACT 18 STRICT MODE RUNS USEEFFECT() TWICE IN DEVELOPMENT, THIS CAUSED THE WEB SCRAPER TO RUN TWICE

/** 
import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";

interface DataProps {
  id: number;
  name: string;
  image: string;
  url: string;
  price: string;
}

const DatabaseComp = () => {
  const [data, setData] = useState<DataProps[]>([]);

  const addData = () => {
    fetch("http://localhost:5000/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Product",
        image: "N/A",
        url: "N/A",
        price: "0",
      }),
    })
      .then((response) => response.json())
      .then((newData) => {
        console.log("Data added:", newData);
        setData((prevData) => [...prevData, newData]);
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));

    addData();
  }, []);

  return (
    <div className="row container-fluid">
      <div className="col-12">
        <h1>Data from Flask API (Backend Database)</h1>
      </div>
      <div className="row">
        <ul className="list-group">
          {data.map((item) => (
            <li className="col" key={item.id}>
              {/*<div>Name: {item.name}</div>
            <div>
              Image: <img src={item.image} alt={item.name} />
            </div>
            <div>
              URL: <a href={item.url}>{item.url}</a>
            </div>
            <div>Price: ${item.price}</div>*}
              <ProductCard
                id={item.id}
                name={item.name}
                image={item.image}
                url={item.url}
                price={item.price}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DatabaseComp;*/

// Code above is original code (doesnt work correctly, runs web scraper twice), code below is fixed and runs web scraper once

import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";

interface DataProps {
  id: number;
  name: string;
  image: string;
  url: string;
  price: string;
}

const DatabaseComp = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const scrapeData = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/data", {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Scraping started...");
        setTimeout(() => {
          fetchData(); // Fetch updated data after a short delay
        }, 5000);
      })
      .catch((error) => console.error("Error starting scraping:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(); // Only fetch data, don't trigger scraping automatically
  }, []);

  return (
    <div className="container">
      <h1>Product Data</h1>
      <button
        onClick={scrapeData}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? "Scraping..." : "Scrape Data"}
      </button>
      <div className="row">
        {data.map((item) => (
          <div className="col-md-4" key={item.id}>
            <ProductCard
              id={item.id}
              name={item.name}
              image={item.image}
              url={item.url}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseComp;
