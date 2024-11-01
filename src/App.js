import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import DetailCard from './components/DetailCard';
import Ranking from './components/Ranking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:name' element={<DetailCard />}/>
        <Route path='/ranking' element={<Ranking />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
