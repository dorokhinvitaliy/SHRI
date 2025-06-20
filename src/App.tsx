import { Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Header from './ui/components/Header/Header';
import Analysis from './ui/pages/Analysis';
import Generate from './ui/pages/Generate';
import History from './ui/pages/History';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Analysis />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<h1>Страница не найдена</h1>} />
      </Routes>
    </div>
  );
}

export default App;
