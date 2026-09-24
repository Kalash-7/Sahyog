import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Citizen from './pages/Citizen';
import Admin from './pages/Admin';
import University from './pages/University';
import Industry from './pages/Industry';
import { ThemeProvider } from './context/ThemeContext';


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizen" element={<Citizen />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/university" element={<University />} />
        <Route path="/industry" element={<Industry />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
