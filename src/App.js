import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import DetailCard from './components/DetailCard';
import Ranking from './screens/Ranking';
import Versus from './screens/Versus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:name' element={<DetailCard />}/>
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/versus' element={<Versus />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
