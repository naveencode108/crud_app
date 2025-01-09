import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/actions/auth";

const Navbar = () => {
   
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const token=useSelector((state)=>state.auth.token);

    const Logout=()=>{
      logout(navigate,dispatch)
    }

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-white text-2xl font-bold tracking-wide">TodoApp</h1>
        {token&&
        <button onClick={Logout} className="flex items-center text-white text-lg font-medium hover:text-gray-300 transition duration-300">
            <IoIosLogOut className="text-2xl mr-2" />
            Logout
        </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
