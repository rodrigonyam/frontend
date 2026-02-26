import React from 'react';
import { Link } from 'react-router-dom';
import AdoptionForm from './AdoptionForm';

const PetDetail = ({ pet, pets }) => {
  if (!pet) {
    return (
      <section className="detail">
        <p className="empty">Pet not found.</p>
        <Link to="/" className="button">Back to list</Link>
      </section>
    );
  }

  return (
    <div className="layout detail-layout">
      <section className="detail">
        <img className="detail__image" src={pet.photo} alt={`${pet.name} the ${pet.species}`} />
        <div className="detail__body">
          <p className="eyebrow">{pet.city}</p>
          <h1>{pet.name}</h1>
          <p className="pet-card__meta">{pet.breed} • {pet.age} • {pet.size}</p>
          <p className="pet-card__description">{pet.description}</p>
          <div className="pet-card__tags">
            {pet.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <Link to="/" className="button">Back to all pets</Link>
        </div>
      </section>

      <section id="apply">
        <div className="section-header">
          <h2>Apply to adopt</h2>
          <p>Tell us why {pet.name} is a fit.</p>
        </div>
        <AdoptionForm pets={pets} preselectedId={pet.id} />
      </section>
    </div>
  );
};

export default PetDetail;
