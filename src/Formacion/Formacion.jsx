import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'; 
import './Formacion.css';

export default function Formacion() {

   
    const videos = [
        {
            id: "rryQmSdWW6g", 
            title: "¿Qué es Bitcoin y como funciona?"
        },
        {
            id: "BHpyGy2X1t4", 
            title: "¿Qué es Ethereum y como funciona?"
        },
        {
            id: "1i_m8pHw8FQ", 
            title: "¿Qué son CEX y DEX?"
        },
        {
            id: "3494fyI6hdI", 
            title: "Binance para principiantes (DEX)"
        },
        {
            id: "3RMdu2BZBu0", 
            title: "Metamask para principiantes (CEX)"
        },
        {
            id: "_C0kRxxzzD8", 
            title: "Cryptopia documental premiado sobre Blockchain"
        }
    ];

    return (
        <div className="formacion-contenedor">
            <div className="formacion-header">
                <h2>🎓 Centro de Formación</h2>
                <p>Aprende los fundamentos de las criptomonedas y blockchain con nuestra selección de videos educativos.</p>
            </div>

            <div className="videos-grid">
                {videos.map((video) => (
                    <div key={video.id} className="video-card">
                        <div className="video-wrapper">
                            <LiteYouTubeEmbed 
                                id={video.id}
                                title={video.title}
                                poster="maxresdefault" 
                                webp={true} 
                            />
                        </div>
                        <h3>{video.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}