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
      <img src={flag} alt={`Flag of ${name}`} style={{ width: "100px", height: "100px" }} />
      <h2>{name}</h2>
    </div>
  );
};

const API = "https://0b9f457a-c7f4-4a28-9f68-2fe10314cedd.mock.pstmn.io/crio ";

function CountryCard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchCountryCard = async () => {
      try {
        const response = await fetch(API);
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchCountryCard();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
        const filtered = data.filter((country) => {
            const countryName = country.name.toLowerCase();

            // Match "ind" only when it's part of the country name as a valid segment
            // To prevent it matching unwanted places like "Greenland" or "Kosovo"
            return countryName.includes(term) && 
                   countryName.match(new RegExp(`\\b${term}`, 'i'));
        });

        console.log(filtered);  // Log the filtered results for debugging
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
        {filteredData.map((countryData) => (
          <Countries key={countryData.name} name={countryData.name} flag={countryData.flag} />
        ))}
        {filteredData.length === 0 && (
          <p style={{ fontSize: "18px", color: "red" }}>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default CountryCard;
