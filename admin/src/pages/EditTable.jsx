import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditTableForm = () => {

  const [table, setTable] = useState()
  const tableId=localStorage.getItem('TableId')
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTable({
      ...table,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const getTable=()=>{
    axios.get(`http://localhost:4000/api/tables/${tableId}`)
  .then((res)=>
    {console.log(res.data);
        setTable(res.data)})

  .catch((error)=>toast.error('Error Adding the table',error))
  }
  const updateTable=async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/tables/${tableId}`,table)
  .then((res)=>
    {console.log(res);
        toast.success('Table updated successfully!')})
  .catch((error)=>toast.error('Error updating the table',error))
  }
  useEffect(()=>{
    getTable();
    console.log(table)
  },[])
  return (

    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      
      <h2 className="text-2xl font-semibold mb-4 text-center">Update table</h2>
      <form onSubmit={(e)=>updateTable(e)} className="space-y-4">
      {['name', 'chairs', 'cx', 'cy'].map((field) => (
  <div key={field}>
  {table &&
    <><label className="block mb-1 capitalize font-medium">{field}</label>
    <input
      type={['chairs', 'cx', 'cy'].includes(field) ? 'number' : 'text'}
      name={field}
      value={table[field]}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
    /></>}
  </div>
))}

{/* Dropdown pour le type */}
<div>
  <label className="block mb-1 font-medium">Type</label>
  <select
    name="type"
    value={table?.type}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
  >
    <option value="">-- Select type --</option>
    <option value="round">Round</option>
    <option value="rect">Rect</option>
    <option value="square">Square</option>
  </select>
</div>

        <div>
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              name="reserved"
              checked={table?.reserved}
              onChange={handleChange}
              className="form-checkbox"
            />
            Reserved
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          update table
        </button>
      </form>
    </div>
  );
};

export default EditTableForm;
