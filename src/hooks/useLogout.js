import axios from "axios";
import useAuth from "./useAuth";

const api = axios.create({
    baseURL: "http://localhost:3000",
  });

const useLogout = () => {
    const {setAuth} = useAuth();
    
    const logout = async ()=>{
        setAuth({});
        try {
            const response = await api('/logout',{
                withCredentials: true
            })
        } catch (error) {
         console.error(error);   
        }
    }
    return logout;
}
export default useLogout