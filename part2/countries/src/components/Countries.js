import Country from './Country';
import CountryDetails from './CountryDetails';

const Countries = ({ countries, query }) => {
  let filtered = [];

  if (query.length > 0) {
    filtered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    });
  } else {
    filtered = countries;
  }

  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filtered.length === 1) {
    return <CountryDetails country={filtered[0]} />;
  } else {
    return (
      <ul>
        {filtered.map((country) => {
          return <Country key={country.name.common} country={country} />;
        })}
      </ul>
    );
  }
};

export default Countries;
