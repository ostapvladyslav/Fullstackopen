import Weather from './Weather';

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </>
      <>
        <b>languages:</b>
        <ul>
          {Object.values(country.languages).map((lang) => {
            return <li key={lang}>{lang}</li>;
          })}
        </ul>
      </>
      <div>
        <img alt='flag' src={country.flags.png} />
      </div>
      <Weather country={country} />
    </>
  );
};

export default CountryDetails;
