import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'

import AddFoodForm from './pages/AddFoodForm'
import AddTableForm from './pages/AddTable'
import Food from './pages/Food'
import Tables from './pages/Tables'
import EditTableForm from './pages/EditTable'
import EditFoodForm from './pages/EditFoodForm'
import Reservations from './pages/Reservations'

const App = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-orange-100">
      <Sidebar  />
      <div className="flex-1 flex flex-col">
        <Navbar/>
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Routes>
          <Route path="/addfood" element={<AddFoodForm />} />
          <Route path="/editfood" element={<EditFoodForm/>} />
          <Route path="/addtable" element={<AddTableForm />} />
          <Route path="/food" element={<Food />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/edittable" element={<EditTableForm />} />
          <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App