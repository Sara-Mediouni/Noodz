import React, { useEffect, useState } from "react";
import TableSVG from "./TableSvg";
import axios from 'axios'


const SeatingPlan = () => {
  const [Tables, setTables] = useState()
  const getTables=()=>{
    try{
      axios.get(`http://localhost:4000/api/tables`)
      .then((response)=>{
        setTables(response.data)
      }).catch((error)=>console.log('Error getting tables',error))

    }
    catch(error){
      console.log(error)
    }
    
  }
  useEffect(()=>{
     getTables()
     console.log(Tables)
  },[])
  return (
    <div className="w-full overflow-auto bg-orange-100 rounded-3xl p-4 shadow-md">
      <svg
        className="w-full h-[600px]"
        viewBox="0 0 1000 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fenêtres du haut */}
        {[100, 300, 500, 700].map((x, i) => (
          <rect
            key={`top-${i}`}
            x={x}
            y={20}
            width={160}
            height={20}
            fill="#B3E5FC"
            stroke="#0288D1"
            rx={5}
          />
        ))}
        <text
          x={500}
          y={15}
          textAnchor="middle"
          fontSize={14}
          fill="#333"
          fontWeight="bold"
        >
          🪟 Windows
        </text>

        {/* Fenêtres gauche */}
        {[100, 200, 300, 400].map((y, i) => (
          <rect
            key={`left-${i}`}
            x={20}
            y={y}
            width={20}
            height={60}
            fill="#B3E5FC"
            stroke="#0288D1"
            rx={5}
          />
        ))}

        {/* Fenêtres droite */}
        {[100, 200, 300, 400].map((y, i) => (
          <rect
            key={`right-${i}`}
            x={960}
            y={y}
            width={20}
            height={60}
            fill="#B3E5FC"
            stroke="#0288D1"
            rx={5}
          />
        ))}

        {/* Tables */}
        {Tables?.map((table) => (
          <TableSVG key={table?.id} {...table} />
        ))}

        {/* Toilet */}
        <rect
          x={100}
          y={450}
          width={80}
          height={60}
          fill="#E0E0E0"
          stroke="#666"
          rx={8}
        />
        <text
          x={140}
          y={485}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill="#333"
        >
          🚻 Toilet
        </text>

        {/* Cashier */}
        <rect
          x={700}
          y={450}
          width={100}
          height={60}
          fill="#FFEB3B"
          stroke="#666"
          rx={8}
        />
        <text
          x={750}
          y={485}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill="#333"
        >
          💰 Cashier
        </text>

        {/* Doors */}
        <rect
          x={850}
          y={200}
          width={20}
          height={160}
          fill="#444"
          stroke="#222"
          rx={3}
        />
        <text
          x={860}
          y={190}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill="#333"
        >
          🚪 Doors
        </text>
      </svg>
    </div>
  );
};

export default SeatingPlan;
