import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import PetList from './components/PetList';
import AdoptionForm from './components/AdoptionForm';
import { pets as petData } from './data/pets';

const App = () => {
  const [filters, setFilters] = useState({
    species: 'all',
    size: 'all',
    city: 'all',
    query: ''
  });
  const [submitted, setSubmitted] = useState(null);

  const filteredPets = useMemo(() => {
    return petData.filter((pet) => {
      const matchesSpecies = filters.species === 'all' || pet.species === filters.species;
      const matchesSize = filters.size === 'all' || pet.size === filters.size;
      const matchesCity = filters.city === 'all' || pet.city === filters.city;
      const matchesQuery =
        filters.query.trim().length === 0 ||
        `${pet.name} ${pet.breed} ${pet.city}`.toLowerCase().includes(filters.query.toLowerCase());
      return matchesSpecies && matchesSize && matchesCity && matchesQuery;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (payload) => {
    setSubmitted(payload);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page">
      <Navbar />

      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow">Modern pet adoption</p>
          <h1>Find a new best friend with confidence.</h1>
          <p className="lede">
            Curated profiles, transparent history, and local matches so every pet lands in a loving home.
          </p>
          <div className="filters">
            <select value={filters.species} onChange={(event) => handleFilterChange('species', event.target.value)}>
              <option value="all">All species</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
            </select>
            <select value={filters.size} onChange={(event) => handleFilterChange('size', event.target.value)}>
              <option value="all">Any size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
            <select value={filters.city} onChange={(event) => handleFilterChange('city', event.target.value)}>
              <option value="all">Anywhere</option>
              <option value="Austin, TX">Austin, TX</option>
              <option value="Seattle, WA">Seattle, WA</option>
              <option value="Denver, CO">Denver, CO</option>
              <option value="Portland, OR">Portland, OR</option>
            </select>
            <input
              type="search"
              placeholder="Search by name, breed, or city"
              value={filters.query}
              onChange={(event) => handleFilterChange('query', event.target.value)}
            />
          </div>
        </div>
      </header>

      {submitted && (
        <div className="confirmation">
          <p>
            Thanks, {submitted.name}! We shared your note with {submitted.petName}. Expect a reply at {submitted.email}.
          </p>
        </div>
      )}

      <main className="layout">
        <section>
          <div className="section-header">
            <h2>Available pets</h2>
            <p>{filteredPets.length} ready for adoption</p>
          </div>
          <PetList pets={filteredPets} />
        </section>

        <section>
          <div className="section-header">
            <h2>Apply to adopt</h2>
            <p>Tell us who you are and which pet you love.</p>
          </div>
          <AdoptionForm pets={petData} onSubmit={handleSubmit} />
        </section>
      </main>
    </div>
  );
};

export default App;
