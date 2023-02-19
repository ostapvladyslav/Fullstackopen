import { useState, useEffect } from 'react';
import Countries from './components/Countries';
import Query from './components/Query';
import searchService from './services/searchService';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    searchService
      .getAll()
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Query query={query} handleQueryChange={handleQueryChange} />
      <Countries countries={countries} query={query} />
    </>
  );
};

export default App;
