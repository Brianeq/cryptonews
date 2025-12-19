import React from 'react';
import './SobreNosotros.css';

export default function SobreNosotros() {
  return (
    <section className="about-section">
      <div className="about-container">
        
        {/* Lado Izquierdo: Imagen */}
        <div className="about-image">
          <img 
            src="/SN.gif" 
            alt="Equipo de CryptoNews" 
          />
        </div>

        {/* Lado Derecho: Texto */}
        <div className="about-text">
          <h2>Sobre CryptoNews</h2>
          <p>
            En <strong>CryptoNews</strong>, nuestra misión es democratizar el acceso a la información 
            financiera del mundo criptográfico. Nos apasiona la tecnología blockchain y creemos 
            firmemente en el futuro de las finanzas descentralizadas.
          </p>
          <p>
            Contamos con un equipo de entusiastas y expertos dedicados a monitorear el mercado 
            las 24 horas del día. Nuestro objetivo es proporcionarte datos precisos, análisis 
            profundos y las herramientas necesarias para que tomes decisiones informadas en el 
            apasionante ecosistema de las criptomonedas.
          </p>
        </div>

      </div>
    </section>
  );
}