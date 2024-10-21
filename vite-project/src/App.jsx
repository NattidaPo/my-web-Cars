import React, { useState, useEffect } from 'react';
import { Layout, Input, Select } from 'antd';
import CarTable from './components/CarTable'; 
import axios from 'axios';
import './App.css';

const { Header, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const App = () => {
  const [cars, setCars] = useState([]); 
  const [filteredCars, setFilteredCars] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState(''); 
  const [page, setPage] = useState(1); 
  const pageSize = 10; 

  const apiUrl = 'https://gist.githubusercontent.com/ak1103dev/e4a31efd9f5dcac80e086f0ab9a88ffb/raw/e77545dbef9b06bd138b085b5421eaca77cfe18f/cars.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl); 
        const makes = response.data?.Makes;
        if (Array.isArray(makes)) {
          const transformedData = makes.map((car) => ({
            make_display: car.make_display,
            make_country: car.make_country,
          }));
          setCars(transformedData); 
          setFilteredCars(transformedData); 
        } else {
          console.error('Expected an array but got:', typeof response.data.Makes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, []); 

  const handleSearch = (value) => {
    const filtered = cars.filter((car) =>
      car.make_display.toLowerCase().includes(value.toLowerCase()) && 
      (selectedCountry ? car.make_country === selectedCountry : true) 
    );
    setFilteredCars(filtered); 
    setPage(1); 
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value); 
    const filtered = cars.filter((car) =>
      car.make_country === value 
    );
    setFilteredCars(filtered); 
    setPage(1); 
  };

  const handlePageChange = (page) => {
    setPage(page); 
  };

  const countryOptions = [...new Set(cars.map(car => car.make_country))].filter(country => country !== "Unknown");

  return (
    <Layout>
      <Header className="custom-header">Cars</Header>
      <Content style={{ padding: '50px', margin: '0 auto', maxWidth: '800px' }}>
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <Search
            placeholder="Search Name"
            className="custom-search"
            onSearch={handleSearch} 
            style={{ width: 200 }}
          />
          <Select
            placeholder="Select Country"
            className="custom-select"
            value={selectedCountry || undefined} 
            onChange={handleCountryChange}
            style={{ width: 200 }}
            allowClear
          >
            <Option value="">All Countries</Option>
            {countryOptions.length === 0 ? (
              <Option disabled>No Countries Available</Option>
            ) : (
              countryOptions.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))
            )}
          </Select>
        </div>
        <CarTable 
          data={filteredCars} 
          page={page} 
          pageSize={pageSize} 
          onPageChange={handlePageChange} 
        />
      </Content>
    </Layout>
  );
};

export default App;
