import { apiCall } from "../AxiosInstance";
import { toast } from "react-hot-toast";

export const Read = async (setData) => {
  try {
    let res = await apiCall.get("/api/todo/read", { withCredentials: true });

    if (res.data.success) {
      setData(res.data.data);
    }
  } catch (er) {
    console.log(er.message);
  }
};

export const Create = async (text,setData) => {
  try {
    let res = await apiCall.post(
      "/api/todo/create",
      { text: text },
      { withCredentials: true }
    );

    if (res.data.success) {
        setData(res.data.data);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (er) {
    console.log(er.message);
  }
};

export const Delete = async(id,setData) => {
    try{
      let res=await apiCall.delete(`/api/todo/${id}`,{withCredentials:true});

      if(res.data.success){
        toast.success(res.data.message);
        setData(res.data.data);
      }
    }
    catch(er){
        console.log(er.message);
    }
};

export const Edit = async(id,text,setData) => {
   try{
     let res=await apiCall.patch(`/api/todo/edit/${id}`,{text},{withCredentials:true});

     if(res.data.success){
      toast.success(res.data.message);
      Read(setData);
     }
   }
   catch(er){
    console.log(er.message)
   }
};
