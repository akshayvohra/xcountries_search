import { useEffect, useState } from "react";

const Countries = ({ flag, name }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid grey",
        borderRadius: "10px",
        padding: "5px",
        height: "200px",
        width: "200px",
        textAlign: "center",
      }}
    >
      <img
        src={flag || "https://via.placeholder.com/100"}
        alt={`Flag of ${name}`}
        style={{ width: "100px", height: "100px" }}
      />
      <h2>{name || "Unknown"}</h2>
    </div>
  );
};

const API =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function CountryCard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchCountryCard = async () => {
      try {
        const response = await fetch(API);
        const jsonData = await response.json();
        console.log("Fetched Data:", jsonData); 
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCountryCard();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const filtered = data.filter((country) => {
        const countryName = country.common?.toLowerCase() || ""; 
        return countryName.includes(term);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          margin: "20px",
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          border: "1px solid grey",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          margin: "10px",
          justifyContent: "center",
        }}
      >
        {filteredData.map((countryData, index) => (
          <Countries
            key={index}
            name={countryData.common}
            flag={countryData.png}
          />
        ))}
        {filteredData.length === 0 && (
          <p style={{ fontSize: "18px", color: "red" }}>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default CountryCard;
