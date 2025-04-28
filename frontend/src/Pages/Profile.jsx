import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function Profile() {
    const id = useSelector((state) => state.auth.user);

    const [updatedUser, setupdatedUser]=useState(null)
    const [user, setUser] = useState()
    const handleChange = (e) => {
        setupdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
        console.log(updatedUser)
      };

    console.log(id)
  const countries = useSelector((state) => state.country.countries);


  
  const getUserInfo=()=>{
   
      try{
        axios.get(`http://localhost:4000/api/user/getuser/${id}`)
        .then((response)=>
            setUser(response.data.user))
        
        .catch((error)=>console.log("Error getting user",error))
    } catch (error) {
      console.log(error)
    }
  }
  const updateuserInfo=(e)=>{
    e.preventDefault()
    try{
    axios.put(`http://localhost:4000/api/user/updateuser/${id}`,updatedUser)
    .then((response)=>{
        console.log(response.data)
        toast.success("Profile updated successfully!")
    }).catch((error)=>console.log(error))
}
    catch(error){
     console.log('Error Updating user',error)
    }
  }
    // Se déclenche uniquement lorsque le token change

  // Deuxième useEffect pour récupérer les infos utilisateur lorsque l'ID est défini
  useEffect(() => {
    if (id) {
      getUserInfo() // Appeler ta fonction pour obtenir les infos utilisateur en fonction de l'ID
    
    }
  }, [id]); // Se déclenche uniquement lorsque l'ID change

  // Logs pour débogage
  useEffect(() => {
    console.log("User", user);
    setupdatedUser(user) // Affiche les infos de l'utilisateur dans la console
  }, [user]);

  if (!user) {
    return <div className="text-center flex justify-center items-center text-gray-500 mt-50">Loading...</div>;
  }

  return (
    <div className="flex items-center mx-auto justify-center min-h-screen">
    { updatedUser &&
      <form onSubmit={updateuserInfo}
      className="bg-white p-8 rounded-3xl mt-30 shadow-2xl max-w-md w-full border border-orange-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">My Profile</h1>
        <div className="space-y-6">
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg font-bold">First Name</span>
            <input value={updatedUser?.firstname}
            name="firstname"
            type="text"
               onChange={handleChange}
            className="text-lg font-semibold !text-black"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg font-bold">Last Name</span>
            <input value={updatedUser?.lastname}
            name="lastname"
            type="text"
            onChange={handleChange}
            className="text-lg font-semibold !text-black"
            />          </div>
          {/* Tu peux ajouter d'autres infos si tu veux */}
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg font-bold">Email</span>
            <input value={updatedUser?.email}
            name="email"
               onChange={handleChange}
            className="text-lg font-semibold !text-black"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg font-bold">Phone</span>
            <input value={updatedUser?.phone}
            name="phone"
               onChange={handleChange}
            className="text-lg font-semibold !text-black"
            />          </div>
          {/* Tu peux ajouter d'autres infos si tu veux */}
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
         <div className="flex flex-col">
            <span className="text-gray-500 text-lg font-bold">City</span>
            <input value={updatedUser?.city}
            name="city"
               onChange={handleChange}
            className="text-lg font-semibold !text-black"
            />        
             </div>
      
          <div className="flex flex-col">
            <span className="text-gray-500 text-lg font-bold">Address</span>
            <input value={updatedUser?.address}
            name="address"
               onChange={handleChange}
            className="text-lg font-semibold !text-black"
            />       
               </div>  </div>

        <div className="flex flex-col">
            <span className="text-gray-500 text-lg font-bold">Country</span>
            <select
           
               name="country"
               onChange={handleChange}
               value={updatedUser?.country}
               

                className="  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition"
              >
              {countries.map((country,index)=>
              <option key={index} value={country}>{country}</option>)}
              
              </select> 
        </div>
      
   
    
        </div>
        <div className="mt-8 text-center">
          <button className="px-6 py-2 rounded-full bg-black hover:bg-orange-300 text-white font-semibold transition">
            Modifier mon profil
          </button>
        </div>
      </form>}
    </div>
  );
}
