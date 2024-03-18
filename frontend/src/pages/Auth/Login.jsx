import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import Loader from "../../Components/Loader";

const Login = () => {
  const [formData, setFormData] = useState({
   
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state)=> state.auth)
  const [login, { isLoading }] = useLoginMutation();

  const {search} = useLocation();
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/";

  const [passwordVisible , setPasswordVissible] = useState(false);
  const setVisibility = ()=> setPasswordVissible(!passwordVisible);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const res = await login(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    }catch(err){
      toast.error(err?.data?.message || err.error);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };
  return (
    <div className="">
       <div
        className="absolute opacity-15 w-full h-full z-1"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-photo/view-3d-cinema-film-reel_23-2151066943.jpg?t=st=1710687284~exp=1710690884~hmac=06b717b92e0cc54509796d32602fbb70544ca280b3ab3e97b1651dafb5b92220&w=996")',
        }}
      ></div>
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
                name="email"
                type="text"
                onChange={handleChange}
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                type={passwordVisible?"text":"password"}
                
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
                <div className="flex gap-6 items-center justify-center">   {isLoading?"logging in..":"Login"} {isLoading && <Loader/>}</div>
            
              </button>
            </div>
          </form>
          <div className="mt-2">
            <span className="text-gray-400 ">
              Doesn't have an account?{" "}
              <span className="text-white cursor-pointer"> Register</span>
            </span>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login
