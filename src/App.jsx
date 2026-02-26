import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PetList from './components/PetList';
import AdoptionForm from './components/AdoptionForm';
import PetDetail from './components/PetDetail';
import { fetchPets } from './api/pets';
import { submitAdoptionRequest } from './api/adoption';

const App = () => {
  const [filters, setFilters] = useState({
    species: 'all',
    size: 'all',
    city: 'all',
    query: ''
  });
  const [pets, setPets] = useState([]);
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    fetchPets().then(setPets);
  }, []);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSpecies = filters.species === 'all' || pet.species === filters.species;
      const matchesSize = filters.size === 'all' || pet.size === filters.size;
      const matchesCity = filters.city === 'all' || pet.city === filters.city;
      const matchesQuery =
        filters.query.trim().length === 0 ||
        `${pet.name} ${pet.breed} ${pet.city}`.toLowerCase().includes(filters.query.toLowerCase());
      return matchesSpecies && matchesSize && matchesCity && matchesQuery;
    });
  }, [filters, pets]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (payload) => {
    await submitAdoptionRequest(payload);
    setSubmitted(payload);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Home = () => (
    <>
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
              <option value="Rabbit">Rabbits</option>
              <option value="Bird">Birds</option>
              <option value="Fish">Fish</option>
              <option value="Small Rodent">Small rodents</option>
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

      <section className="how" id="how">
        <div className="how__card">
          <p className="eyebrow">Step 1</p>
          <h3>Browse screened profiles</h3>
          <p className="muted">Every pet includes temperament, history, and lifestyle fit so you can match quickly.</p>
        </div>
        <div className="how__card">
          <p className="eyebrow">Step 2</p>
          <h3>Apply with context</h3>
          <p className="muted">Share your routine and home setup; the rescue responds with next steps in a day.</p>
        </div>
        <div className="how__card">
          <p className="eyebrow">Step 3</p>
          <h3>Meet and finalize</h3>
          <p className="muted">Schedule a meet-and-greet, review records, and welcome your new friend home.</p>
        </div>
      </section>

      {submitted && (
        <div className="confirmation">
          <p>
            Thanks, {submitted.name}! We shared your note with {submitted.petName}. Expect a reply at {submitted.email}.
          </p>
        </div>
      )}

      <main className="layout">
        <section id="pets">
          <div className="section-header">
            <h2>Available pets</h2>
            <p>{filteredPets.length} ready for adoption</p>
          </div>
          <PetList pets={filteredPets} />
        </section>

        <section id="apply">
          <div className="section-header">
            <h2>Apply to adopt</h2>
            <p>Tell us who you are and which pet you love.</p>
          </div>
          <AdoptionForm pets={pets} onSubmit={handleSubmit} />
        </section>
      </main>
    </>
  );

  const PetRoute = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const pet = pets.find((item) => item.id === petId);

    useEffect(() => {
      if (pets.length === 0) {
        fetchPets().then(setPets);
      }
    }, [pets.length]);

    useEffect(() => {
      if (!pet && pets.length) {
        navigate('/');
      }
    }, [pet, pets.length, navigate]);

    return <PetDetail pet={pet} pets={pets} />;
  };

  return (
    <div className="page">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets/:petId" element={<PetRoute />} />
      </Routes>
    </div>
  );
};

export default App;
