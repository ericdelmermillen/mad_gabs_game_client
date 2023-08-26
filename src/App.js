import './App.scss';
import Timer from './components/Timer/Timer';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Gabs from "./pages/Gabs/Gabs";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Timer />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/:level" element={<Gabs />}/>
      </Routes>
    </BrowserRouter>
  )};

export default App;
