// src/Contacto/Contacto.jsx

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contacto.css';

export default function Contacto (){
  const form = useRef();
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    // REEMPLAZA ESTOS VALORES CON LOS DE TU CUENTA DE EMAILJS
    const SERVICE_ID = 'service_6n3dop6';
    const TEMPLATE_ID = 'template_b0wym2c';
    const PUBLIC_KEY = 'rN1ezfcqFcRHBWXQp';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setEnviado(true);
          setCargando(false);
          form.current.reset(); // Limpia el formulario
        },
        (error) => {
          console.error('FAILED...', error.text);
          setError('Hubo un error al enviar el mensaje. Inténtalo más tarde.');
          setCargando(false);
        },
      );
  };

  return (
    <div className="contacto-contenedor">
      <div className="contacto-wrapper">
        <h2>📩 Contáctanos</h2>
        <p>¿Tienes dudas o sugerencias? Envíanos un mensaje.</p>

        {enviado ? (
          <div className="mensaje-exito">
            <h3>¡Gracias! 🚀</h3>
            <p>Tu mensaje ha sido enviado correctamente. Te responderemos pronto.</p>
            <button onClick={() => setEnviado(false)} className="btn-volver">
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="formulario">
            <div className="campo">
              <label>Nombre</label>
              <input type="text" name="user_name" placeholder="Tu nombre" required />
            </div>

            <div className="campo">
              <label>Email</label>
              <input type="email" name="user_email" placeholder="tucorreo@ejemplo.com" required />
            </div>

            <div className="campo">
              <label>Mensaje</label>
              <textarea name="message" rows="5" placeholder="Escribe tu mensaje aquí..." required />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="btn-enviar" disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}