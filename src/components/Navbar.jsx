import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">Adoptable</div>
      <div className="navbar__links">
        <a href="#pets">Pets</a>
        <a href="#apply">Apply</a>
        <a href="#how">How it works</a>
      </div>
      <button className="navbar__cta">Start matching</button>
    </nav>
  );
};

export default Navbar;
