import axios from 'axios';
import useAuth from './useAuth';

const api = axios.create({
    baseURL: "http://localhost:3000",
  });

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;