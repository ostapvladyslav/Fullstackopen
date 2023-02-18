import PersonDetails from './PersonDetails';
const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <PersonDetails key={person.name} person={person} />
      ))}
    </>
  );
};
export default Persons;
