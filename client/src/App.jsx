import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import Mybookings from './pages/Mybookings';
import HotelReg from './components/hotelReg';
import Layout from './pages/HotelOwner/Layout';
import Dashboard from './pages/HotelOwner/Dashboard';
import AddRoom from './pages/HotelOwner/AddRoom';
import ListRoom from './pages/HotelOwner/ListRoom';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/appContext';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg} = useAppContext();

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<Mybookings />} />
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom/>} />
          </Route >
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
