import React, { useState, useEffect } from 'react';
import './CurrencySearch.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CurrencySearch = () => {
  const [currency, setCurrency] = useState(''); 
  const [countries, setCountries] = useState([]);
  const [flagCodes, setFlagCodes] = useState({}); 
  useEffect(() => {
    // Fetch flag codes from API
    fetch('https://flagcdn.com/en/codes.json')
      .then(response => response.json())
      .then(data => {
        setFlagCodes(data); // Update flag codes state with fetched data
      })
      .catch(error => {
        console.error('Error fetching flag codes:', error); // Log error if fetching fails
      });
  }, []); // Run effect only once on component mount

  const handleChange = (event) => {
    setCurrency(event.target.value); // Update currency state with input value
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Fetch countries based on entered currency code
    fetch(`https://restcountries.com/v3.1/currency/${currency}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw error for non-ok responses
        }
        return response.json(); // Parse response JSON
      })
      .then(data => {
        setCountries(data); // Update countries state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log error if fetching fails
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="inputContainer">
          <input
            type="  text"
            placeholder="    Search by Currency INR, EUR "
            value={currency}
            onChange={handleChange}
            className="inputField"
          />
          <FontAwesomeIcon icon={faSearch} className="searchIcon" onClick={handleSubmit} /> 
        </div>
      </form>
      <div className="headingContainer">
        <h2>Countries with Currency: {currency}</h2>
      </div>
      <div className="countryContainer">
        {countries.map((country) => (
          <div key={country.name.common} className="countryBox">
            <div className="boxWrapper">
                <div className="flagBox">
                {flagCodes[country.cca2] || (
                    <img src={`https://flagsapi.com/${country.cca2}/flat/64.png`} alt="Flag" style={{ width: '100%', height: '100%' }} />
                )}
                </div>
                <div className="infoBox">
                <p className="countryName">Name: {country.name.common}</p>
                <p className="capitalName">Capital: {country.capital}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CurrencySearch; 
