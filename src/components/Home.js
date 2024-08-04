import React from 'react';
import Notes from './Notes';

const Home = (props) => {
  // This line uses object destructuring to extract showAlert from the props object, making it available as a variable within the Home component.
  const { showAlert } = props;

  return (
    <div>
      {/* Pass showAlert as a prop to the Notes component */}
      <Notes showAlert={showAlert} />
    </div>
  )
}

export default Home;
