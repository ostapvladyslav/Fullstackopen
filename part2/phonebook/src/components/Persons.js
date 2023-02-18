import PersonDetails from './PersonDetails';
const Persons = ({ personsToShow, handlePersonDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.name}>
          <PersonDetails person={person} handlePersonDelete />
          <button
            onClick={() => {
              handlePersonDelete(person);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </>
  );
};
export default Persons;
