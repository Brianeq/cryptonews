// src/Mercado/Mercado.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mercado.css'; 

export default function Mercado() { 
    const [monedas, setMonedas] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    // URL directa de CoinGecko (No requiere clave ni proxy)
    const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // Hacemos la petición directa
                const respuesta = await axios.get(API_URL);
                setMonedas(respuesta.data); 
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError('No se pudieron cargar los datos. Intenta de nuevo más tarde.');
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []); 

    if (cargando) {
        return (
            <div className="mercado-contenedor">
                <p>Cargando precios en tiempo real...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mercado-contenedor error">
                <h2>⚠️ {error}</h2>
            </div>
        );
    }

    return (
        <div className="mercado-contenedor">
            <h2>📈 Mercado Cripto (Top 100)</h2>
            
            <table className="tabla-monedas">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Moneda</th>
                        <th>Símbolo</th>
                        <th>Precio</th>
                        <th>Cambio (24h)</th>
                        <th>Cap. Mercado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* CoinGecko devuelve los datos listos, usamos ? para proteger el renderizado */}
                    {monedas?.map((moneda) => (
                        <tr key={moneda.id}>
                            <td>{moneda.market_cap_rank}</td>
                            <td className="nombre-moneda">
                                {/* ¡CoinGecko nos da la imagen! */}
                                <img src={moneda.image} alt={moneda.name} style={{width: '25px', marginRight: '10px'}}/>
                                {moneda.name}
                            </td>
                            <td style={{textTransform: 'uppercase'}}>{moneda.symbol}</td>
                            
                            <td>${moneda.current_price?.toLocaleString()}</td>
                            
                            <td className={moneda.price_change_percentage_24h > 0 ? 'positivo' : 'negativo'}>
                                {moneda.price_change_percentage_24h?.toFixed(2)}%
                            </td>
                            
                            <td>${moneda.market_cap?.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}