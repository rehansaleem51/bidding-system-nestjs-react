import axios from "axios";
import {authStore} from '../store/authStore'
import UserService from '../services/auth-service';


const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json', 
    },
})

instance.interceptors.request.use(

    (config) => {
        const token = authStore.getState().token;
        
        if (token) {
            config.headers['Authorization'] = 'Bearer '+token;
        }
    
        return config;
    }, 
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {    
    const logout = authStore.getState().logout;
    const user = authStore.getState();
    if(error.response.status == 401){
        logout();
        UserService.logout(user)
        window.location.href = '/login'
      
    }
    return Promise.reject(error)
});


export default instance