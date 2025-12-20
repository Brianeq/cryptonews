import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mercado.css'; 

export default function Mercado() { 
    const [monedas, setMonedas] = useState([]);
    const [busqueda, setBusqueda] = useState(''); // Estado para la búsqueda
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await axios.get(API_URL);
                setMonedas(respuesta.data); 
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError('No se pudieron cargar los datos.');
            } finally {
                setCargando(false);
            }
        };
        obtenerDatos();
    }, []); 

    // Lógica de filtrado
    const monedasFiltradas = monedas.filter((moneda) =>
        moneda.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        moneda.symbol.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (cargando) return <div className="mercado-contenedor"><p>Cargando precios...</p></div>;
    if (error) return <div className="mercado-contenedor error"><h2>⚠️ {error}</h2></div>;

    return (
        <div className="mercado-contenedor">
            <div className="header-mercado">
                <h2> Mercado Cripto (Top 100)</h2>
                {/* BARRA DE BÚSQUEDA */}
                <input 
                    type="text" 
                    placeholder="Buscar" 
                    className="input-busqueda"
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
            
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
                    {monedasFiltradas.map((moneda) => (
                        <tr key={moneda.id}>
                            <td>{moneda.market_cap_rank}</td>
                            <td className="nombre-moneda">
                                {/* ENLACE REAL: Esto no falla nunca */}
                                <a 
                                    href={`https://www.coingecko.com/en/coins/${moneda.id}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="link-cripto"
                                >
                                    <img src={moneda.image} alt={moneda.name} style={{width: '25px', marginRight: '10px'}}/>
                                    <span>{moneda.name}</span>
                                </a>
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