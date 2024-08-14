import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";

interface DataProps {
  id: number;
  name: string;
  image: string;
  url: string;
  price: number;
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
        price: 0,
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
    <div>
      <h1>Data from Flask API (Backend Database)</h1>
      <ul className="list-group">
        {data.map((item) => (
          <li key={item.id}>
            {/*<div>Name: {item.name}</div>
            <div>
              Image: <img src={item.image} alt={item.name} />
            </div>
            <div>
              URL: <a href={item.url}>{item.url}</a>
            </div>
            <div>Price: ${item.price}</div>*/}
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
  );
};

export default DatabaseComp;
