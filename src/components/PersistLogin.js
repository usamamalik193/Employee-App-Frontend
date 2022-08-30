import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setisLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth}= useAuth();

    useEffect(()=>{
        const verifyResreshToken = async ()=>{
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            }
            finally{
                setisLoading(false);
            }
        }

        !auth?.accessToken ? verifyResreshToken() : setisLoading(false);

    },[])

    return(
        <>
        {
            isLoading
            ?<p>..Loading</p>
            :<Outlet/>
        }
        </>
    )
}
export default PersistLogin  