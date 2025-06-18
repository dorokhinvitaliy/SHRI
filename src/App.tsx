import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './ui/pages/Home'


function App() {
  return (
    <div>
      <nav>
        <Link to="/">Главная</Link>{' '}
        <Link to="/about">О нас</Link>{' '}
        <Link to="/contact">Контакт</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
{/*         <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {/* Резервный маршрут */}
        <Route path="*" element={<h1>Страница не найдена</h1>} />
      </Routes>
    </div>
  )
}

export default App
