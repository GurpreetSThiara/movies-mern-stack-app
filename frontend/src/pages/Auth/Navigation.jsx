import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/users";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";

const Navigation = () => {
    const {userInfo} = useSelector((state)=>state.auth)
    const [openDropdown,setOpenDropdown] = useState(false);

    const toggleDropdown = () => setOpenDropdown(!openDropdown)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLoginMutation();

  return (
    <div className="fixed bottom-10 left-[30rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] px-[4rem] mb-[2rem] rounded">
       <section className="flex justify-between items-center">
        {/* {section 1} */}
        <div className="flex justify-center items-center mb-[2rem]">
            <Link to='/' className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineHome className="mr-2 mt-[3rem]" size={26}/>
                 <span className="hidden nav-item-name mt-[3rem]">Home</span>
            </Link>
            <Link to='/movies' className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]">
                <MdOutlineLocalMovies className="mr-2 mt-[3rem]" size={26}/>
                <span className="hidden nav-item-namme mt-[3rem]">SHOP</span>
            </Link>
        </div>

        {/* sextion 2 */}

        <div className="relative">
            <button onClick={toggleDropdown} className="text-gray-800 focus:outline-none">
                {userInfo?(<span className="text-white">{userInfo.username}</span>
                    ):<></>}
                    {/* {us} */}

                    {userInfo && (
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${openDropdown?"transform rotate-180":""}`} fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={'2'} d={openDropdown?"M5 15l7-7 7 7":"M19 9l-7 7-7-7"}
                            />
                        </svg>
                    )}
            </button>

            {openDropdown && userInfo && (<ul className={`absolute right-0 mt-2 mr-14 w-[10rem] space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin?"-top-20":"-top-24"}`}>
                {userInfo.isAdmin && (
                    <>
                    <li>
                        <Link to={'/admin/movies/dashboard'} className="block px-4 py-2 hover:bg-gray-100">
                            Dashboard
                        </Link>
                        </li></>
                )}
                <li>
                    <Link to={'/profile'} className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                    </Link>
                    <li>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                            Logout
                        </button>
                    </li>
                </li>
            </ul>)}
        </div>

       </section>
    </div>
  )
}

export default Navigation