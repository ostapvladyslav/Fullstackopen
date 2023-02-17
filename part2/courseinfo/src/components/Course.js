const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total course={course} />
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ course }) => (
  <p>
    <b>
      total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{' '}
      exercises
    </b>
  </p>
);

export default Course;
