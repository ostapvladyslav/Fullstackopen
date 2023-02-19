import CountryDetails from './CountryDetails';
import { useState } from 'react';

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <li>
      <>{country.name.common}</>
      <button onClick={handleClick}>show</button>
      {show ? <CountryDetails country={country} /> : <></>}
    </li>
  );
};

export default Country;
