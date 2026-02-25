import React from 'react';
import PetCard from './PetCard';

const PetList = ({ pets }) => {
  if (!pets.length) {
    return <p className="empty">No pets match these filters yet.</p>;
  }

  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
