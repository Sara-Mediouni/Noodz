
import './index.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Reserv from './Sections/reserv';
import Reservation from './Pages/Reservation';
import { useEffect, useState } from 'react';
import Loader from './Components/Loader';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import MyReservations from './Pages/MyReservations';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="min-h-screen flex flex-col">
  <main className="flex-grow">

     <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/my" element={<ProtectedRoute><MyReservations/></ProtectedRoute>}/>
          
          
        </Routes>
    </main> <Footer />
    </div>
  )
}

export default App
