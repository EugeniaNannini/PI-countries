import './App.css';
import { Routes, Route } from 'react-router-dom';

//importo los componentes
import Home from '../src/components/Home';
import LandingPage from '../src/components/Landingpage';



export default function App() {
  return (
    <div className="App">
    <Routes> 
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
    </div>
    
  );
}
// export default App(); --> esto no funciona 


