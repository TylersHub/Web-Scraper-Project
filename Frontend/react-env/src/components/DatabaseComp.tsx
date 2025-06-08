import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface DataProps {
  id: number;
  name: string;
  image: string;
  url: string;
  price: string;
}

interface Props {
  reloadKey: number;
}

const DatabaseComp: React.FC<Props> = ({ reloadKey }) => {
  const [data, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(); // fetch results whenever reloadKey changes
  }, [reloadKey]);

  return (
    <div className="container">
      <h2>Search Results</h2>

      <div className="">
        <button onClick={fetchData} className="btn btn-secondary">
          Refresh Results
        </button>
      </div>

      {loading && <p>Loading results...</p>}

      <div className="row m-3">
        {data.length > 0 ? (
          data.map((item) => (
            <div className="col-lg-3" key={item.id}>
              <ProductCard
                id={item.id}
                name={item.name}
                image={item.image}
                url={item.url}
                price={item.price}
              />
            </div>
          ))
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default DatabaseComp;
