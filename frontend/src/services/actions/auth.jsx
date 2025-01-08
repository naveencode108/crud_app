import { setToken } from "../../slices/authSlices";
import { apiCall } from "../AxiosInstance";
import { toast } from "react-hot-toast";

export const signup = async (data, navigate) => {
  try {
    let res=await apiCall.post('/api/auth/signup',data,{withCredentials:true});

    if(res.data.success){
        toast.success(res.data.message);
        navigate('/login')
    }
    else{
        toast.error(res.data.message);
    }
  } catch (er) {
    toast.error(er.message);
    console.log(er.message);
  }
};

export const login = async (data, navigate, dispatch) => {
  try {
    let res = await apiCall.post("/api/auth/login", data, {
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success(res.data.message);
      localStorage.setItem("login_token", res.data.token);
      dispatch(setToken(res.data.token));
      navigate("/");
    } else {
      console.log(res.data.message);
      toast.error(res.data.message);
    }
  } catch (er) {
    console.log(er.message);
  }
};

export const logout = async(navigate,dispatch) => {
    try{
       let res=await apiCall.post('/api/auth/logout',{},{withCredentials:true});

       if(res.data.success){
         localStorage.removeItem('login_token');
         dispatch(setToken(''));
         navigate('/login');
         toast.success(res.data.message);
       }
    }
    catch(er){
        console.log(er.message);
    }
};
