import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useRegisterMutation } from "../../redux/api/users";
import {setCredentials} from "../../redux/features/auth/authSlice";
import {toast} from 'react-toastify'

const Register = () => {
  const [usernameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{6,}$/; 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [width, setWidth] = useState(window.innerWidth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!regex.test(formData.username)) {
      setUserNameError("username should always start with alphabet and minimum length 4");
  
    }else{
      setUserNameError('')
    }
    if (!emailRegex.test(formData.email)) {
      setEmailError("please provide a valid email address");
    }else{
      setEmailError('')
    }
    if(!passwordRegex.test(formData.password)){
      setPasswordError('password length must be atleast 6')
    }else{
      setPasswordError('')
    }
    if(!usernameError && !emailError && !passwordError){
      try{
        let u = formData.username;
        let e = formData.email;
        let p = formData.password;
        console.log(formData);
        const res = await register({ u, e, p }).unwrap(); 
        dispatch(setCredentials({...res}))
       navigate(redirect)
       toast.success('registered successfully')
       
       
      }catch(e){
        console.log(e);
        toast.error(e)
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  return (
    <>
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
                username
              </label>
              <input
                required
                onChange={handleChange}
                value={formData.username}
                name="username"
                type="text"
                className="bg-gray-600 rounded-xl w-full border-gray-800 border h-10   px-2"
              />
              <span className="text-red-700 text-sm ">{usernameError}</span>
            </div>
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
              <span className="text-red-700 text-sm ">{emailError}</span>
            </div>
            <div className="w-full flex flex-col">
              <span htmlFor="name" className="x">
                password
              </span>

              <input
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="text"
                className="bg-gray-600 rounded-xl w-full border-gray-800 border h-10    px-2"
              />
            </div>
            <span className="text-red-700 text-sm ">{passwordError}</span>

            <div className="">
              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[#002244] opacity-100 p-2 px-4"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-2">
            <span className="text-gray-400 ">
              Already have an account?{" "}
              <span className="text-white cursor-pointer"> Login</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
