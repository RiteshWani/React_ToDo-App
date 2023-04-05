import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import ToDo from './pages/ToDo';
import Navbar from './pages/Navbar';

function App() {
  return(
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/To-Do List" element={<ToDo />}/>
      </Routes>
    </>
  )
}

export default App;
