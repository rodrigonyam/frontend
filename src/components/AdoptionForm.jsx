import React, { useState } from 'react';

const defaultForm = {
  name: '',
  email: '',
  petId: '',
  message: ''
};

const AdoptionForm = ({ pets, onSubmit, preselectedId }) => {
  const [form, setForm] = useState({ ...defaultForm, petId: preselectedId || pets[0]?.id || '' });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const pet = pets.find((item) => item.id === form.petId);
    onSubmit?.({ ...form, petName: pet?.name || 'your chosen pet' });
    setForm({ ...defaultForm, petId: preselectedId || pets[0]?.id || '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit} id="apply">
      <label className="form__field">
        <span>Your name</span>
        <input
          required
          value={form.name}
          onChange={(event) => handleChange('name', event.target.value)}
          placeholder="Alex Doe"
        />
      </label>

      <label className="form__field">
        <span>Contact email</span>
        <input
          type="email"
          required
          value={form.email}
          onChange={(event) => handleChange('email', event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <label className="form__field">
        <span>Pet you want</span>
        <select value={form.petId} onChange={(event) => handleChange('petId', event.target.value)} required>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name} — {pet.breed}
            </option>
          ))}
        </select>
      </label>

      <label className="form__field">
        <span>Short note</span>
        <textarea
          rows="4"
          required
          value={form.message}
          onChange={(event) => handleChange('message', event.target.value)}
          placeholder="Share your home setup, schedule, and why this pet is a fit."
        />
      </label>

      <button type="submit" className="button">Send adoption request</button>
    </form>
  );
};

export default AdoptionForm;
