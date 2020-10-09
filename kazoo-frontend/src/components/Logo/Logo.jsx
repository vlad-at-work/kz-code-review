import React from 'react'
import logoImage from '../../images/logo.png'

import './Logo.css'

function Logo() {
  return (
    <div className="logo-group">
      <h1 className="title">
        <img id="kz-logo" src={logoImage} alt="kzoo.it logo" />
      </h1>

      <h2 className="subtitle">Superlative URL Shortener</h2>
    </div>
  );
}

export default Logo;
