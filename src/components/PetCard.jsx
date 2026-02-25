import React from 'react';

const PetCard = ({ pet }) => {
  return (
    <article className="pet-card">
      <div className="pet-card__image">
        <img src={pet.photo} alt={`${pet.name} the ${pet.species}`} loading="lazy" />
        <span className="pet-card__tag">{pet.temperament}</span>
      </div>
      <div className="pet-card__body">
        <header className="pet-card__header">
          <div>
            <p className="pet-card__eyebrow">{pet.city}</p>
            <h3>{pet.name}</h3>
            <p className="pet-card__meta">{pet.breed} • {pet.age} • {pet.size}</p>
          </div>
          <span className="pill">{pet.species}</span>
        </header>
        <p className="pet-card__description">{pet.description}</p>
        <div className="pet-card__tags">
          {pet.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PetCard;
