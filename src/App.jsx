import './App.scss';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Gabs from "./pages/Gabs/Gabs";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />   
        <Route path="/gabs" element={<Navigate to="/home" />} />
        <Route path="/gabs/:level" element={<Gabs />}/>
      </Routes>
    </BrowserRouter>
  )};

export default App;
