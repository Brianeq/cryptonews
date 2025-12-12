import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Navbar from './Navbar/NavBar'
import HeroSlider from './HeroSlider/HeroSlider'
import MiniCharts from './MiniCharts/MiniCharts'
import Footer from './Footer/Footer'
import Noticias from './Noticias/Noticias'
import Mercado from './Mercado/Mercado'
import Formacion from './Formacion/Formacion'
import Contacto from './Contacto/Contacto'
import { Routes, Route } from "react-router-dom";


function Home() {
  return (
    <main>
      <HeroSlider />
      <MiniCharts />
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/mercado" element={<Mercado />} />
        <Route path="/formacion" element={<Formacion />} />
        <Route path="/contacto" element={<Contacto />} />
      
        
      </Routes>

      <Footer />
    </>
  );
}