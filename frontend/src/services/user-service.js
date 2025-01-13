import apiClient from './api-client';

class UserService {

    listing(pageNumber=1, searchQuery)
    {
        return apiClient.get(`/users?page=${pageNumber}&search=${searchQuery}`);
    }

    create(data)
    {
        return apiClient.post("/user/store", data);
    }

    edit(data, id)
    {
        return apiClient.post(`/user/update/${id}`, data);
    }

    find(id)
    {
        return apiClient.get(`/user/find/${id}`);
    }
}

export default new UserService();