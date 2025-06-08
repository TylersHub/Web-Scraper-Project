import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import DatabaseComp from "./components/DatabaseComp";

const App: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const searchProducts = (searchTerm: string) => {
    setLoading(true);
    fetch("http://localhost:5000/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchTerm }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log(`Scraping started for: ${searchTerm}`);
        setShowResults(true);
        setReloadKey((prev) => prev + 1); // trigger reload in DatabaseComp
      })
      .catch((error) => console.error("Error scraping:", error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container">
      <div className="row text-center">
        <p className="fs-1 fw-semibold">Web Scraper</p>
      </div>

      <div className="row mb-4">
        <SearchBar
          inputLabel="Search Amazon"
          inputPlaceholder="e.g. mechanical keyboard"
          onSearch={searchProducts}
        />
      </div>

      {loading && (
        <div className="row text-center">
          <p>Loading and scraping...</p>
        </div>
      )}

      {showResults && (
        <div className="row">
          <DatabaseComp reloadKey={reloadKey} />
        </div>
      )}
    </div>
  );
};

export default App;
