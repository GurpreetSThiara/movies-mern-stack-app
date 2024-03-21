import { useEffect, useState } from "react";

const CreateMovie = () => {
    const [formData, setFormData] = useState({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        genre: "",
      });
      const [loaded, setLoaded] = useState(false);

      useEffect(() => {
        // Simulate loading time
        const timeout = setTimeout(() => {
          setLoaded(true);
        }, 1000);
    
        return () => clearTimeout(timeout);
      }, []);
    const handleSubmit = ()=>{

    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData((state) => ({ ...state, [name]: value }));
      };
  return (
    <div className="">
    <div>
    <div className={`flex justify-center items-center h-screen transition-opacity transition-transform ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <img
        src="https://img.freepik.com/free-vector/cinema-film-production-realistic-transparent-composition-with-isolated-image-clapper-with-empty-fields-vector-illustration_1284-66163.jpg?t=st=1711044792~exp=1711048392~hmac=e371d61f6a70969c6c1f5442a888ba25b5d5c34e56afaead71d62d56fd80ff74&w=740"
        alt="Clapperboard"
        className={`max-w-full max-h-full ${loaded ? 'animate-bounce' : ''}`}
      />
    </div>
    </div>
      <div className="flex flex-col items-center justify-center w-full  h-screen">
     <div>
       <h1 className="font-sans font-bold lg:text-8xl text-6xl md:8xl opacity-30 backdrop-blur-3xl border-opacity-95">
         V Movies
       </h1>
     </div>
     <div className="z-50 lg:p-10 lg:rounded-3xl rounded-lg p-[0.5rem] bg-gray-800 bg-opacity-70  flex flex-col items-center justify-center w-11/12 md:w-4/5 lg:w-2/4">
       <form
         onSubmit={handleSubmit}
         action=""
         className="space-y-4 container m-[1rem] sm:w-9/10 md:w-4/5 lg:w-3/4"
       >
       
         <div className="w-full flex flex-col">
           <label htmlFor="name" className="x">
             email
           </label>
           <input
             required
             name="movieName"
             type="text"
             onChange={handleChange}
             value={formData.moviename}
             className=" bg-gray-600 rounded-xl w-full border-gray-800 border h-10  px-2"
           />
         </div>
         <div className="w-full flex flex-col">
           <span htmlFor="name" className="x">
             password
           </span>

          <div className="w-full">
          {/* <div className="absolute  mt-2 mr-2 w-3/4  items-center flex justify-center">
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          ddddd
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}

          </div> */}

     
           <input
             required
             name="password"
             value={formData.detail}
             onChange={handleChange}
             type={"text"}
             className="bg-gray-600 rounded-xl w-full border-gray-800 border h-10 px-2"
           />
             {/* <button
     type="button"
     onClick={setPasswordVissible}
     className="z-100 absolute top-0 right-0 mt-2 mr-2"
   >
     {passwordVisible ? <FaEyeSlash /> : <FaEye />}
   </button> */}
           </div>
         </div>

         <div className="">
           <button
             type="submit"
             className="mt-2 w-full rounded-xl bg-[#002244] opacity-100 p-2 px-4"
           >
             <div className="flex gap-6 items-center justify-center">Create   </div>
         
           </button>
         </div>
       </form>
    
     </div>
   </div>
   
 </div>
  )
}

export default CreateMovie
