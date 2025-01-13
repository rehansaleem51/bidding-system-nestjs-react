import apiClient from './api-client';

class UserService {

   

    login(data)
    {
        return apiClient.post("auth/login", data);
    }

    logout(user)
    {
        //console.log('service', data)
        return apiClient.post("auth/logout", {
            'username': user.username
        });
    }
}

export default new UserService();