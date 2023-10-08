import React, { useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Search = () => {
  const [isError, setIsError] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => { // useEffect loads data to page before user inputs anything
    async function fetchCountries() {
      try {
        const response = await fetch('http://localhost:5000/workHuman/countries');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (e) {
        setIsError(true); // Set error state to true in case of an error
        console.error(e);
      }
    }
    fetchCountries(); // Call the function to fetch countries when the component mounts
  }, []); // Empty dependency array ensures this effect runs once on mount

  
  // const countries = 
  // [
  //   { name: "Belgium", continent: "Europe" },
  //   { name: "India", continent: "Asia" },
  //   { name: "Bolivia", continent: "South America" },
  //   { name: "Ghana", continent: "Africa" },
  //   { name: "Japan", continent: "Asia" },
  //   { name: "Canada", continent: "North America" },
  //   { name: "New Zealand", continent: "Australasia" },
  //   { name: "Italy", continent: "Europe" },
  //   { name: "South Africa", continent: "Africa" },
  //   { name: "China", continent: "Asia" },
  //   { name: "Paraguay", continent: "South America" },
  //   { name: "Usa", continent: "North America" },
  //   { name: "France", continent: "Europe" },
  //   { name: "Botswana", continent: "Africa" },
  //   { name: "Spain", continent: "Europe" },
  //   { name: "Senegal", continent: "Africa" },
  //   { name: "Brazil", continent: "South America" },
  //   { name: "Denmark", continent: "Europe" },
  //   { name: "Mexico", continent: "South America" },
  //   { name: "Australia", continent: "Australasia" },
  //   { name: "Tanzania", continent: "Africa" },
  //   { name: "Bangladesh", continent: "Asia" },
  //   { name: "Portugal", continent: "Europe" },
  //   { name: "Pakistan", continent:"Asia" },
  // ];
  // useEffect(() => {
  //     setFilteredCountries("Ireland");
  // }, []);
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Filter countries based on the search input
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(inputValue.toLowerCase())
      //includes search for a substring in a string
    );
    setFilteredCountries(filtered);
  };
  
  const handleDropdown = (e, value) => {
    const inputValue = value;
    // Filter countries based on the search input
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };
  return (
    <div>
      {isError && <Alert severity="error">Failed to fetch countries from Database</Alert>}
      <br/>
      <Autocomplete
        // freeSolo
        onChange={handleDropdown}
        disableClearable
        options={filteredCountries.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleChange}
            id = "search"
            color = "primary"
            label="Search for a country"
            style={{ // style the search bar
              marginBottom: "20px",
              width: 500,
              borderRadius: "5px",
              // color: "white",
            }}
            InputProps={{ // style area where user types
              style: {backgroundColor: "white"},
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <table>
        <tbody>
          {filteredCountries.map((country, index) => (
           index % 3 === 0 && ( // create new row after every 3 countries
            <tr key={index}>
              {filteredCountries.slice(index, index + 3).map((country, subIndex) => ( // slice array to get 3 countries at a time
                <td key={subIndex}>
              <Card 
                variant="outlined" 
                size={"lg"}
                sx={{ maxWidth: 600, 
                backgroundColor: "#010416", 
                borderColor: "white",
                padding: "15px",
                margin: "2px",
                text: "white",
                border: "2px solid white",
                borderRadius: "10px",
              }} 
              >
                <CardHeader
                  sx = {{color: "white"}}
                  title={country.name}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={country.flag}
                  alt="country flag"
                />
                <CardContent>
                  <Typography variant="body1" color="white" >
                    {"Capital: " + country.details.capital}
                  </Typography>
                  <Typography variant="body1" color="white">
                    {"Population: " + country.details.population + " people"}
                  </Typography>
                  <Typography variant="body1" color="white">
                    {"Currency: " + country.details.currency}
                  </Typography>
              </CardContent>
              </Card>
              </td>
              ))}
            </tr>
              )
          ))} 
        </tbody>
      </table>
    </div>
  );
};
export default Search;
