import apiClient from './api-client';

class ItemService {

    listing(pageNumber=1, searchQuery)
    {
        return apiClient.get(`/items?page=${pageNumber}&search=${searchQuery}`);
    }

    getAll()
    {
        return apiClient.get(`/items`);
    }
   
    create(data)
    {
        
        return apiClient.post("/items", data)
    }

    

    find(id)
    {
        return apiClient.get(`/items/${id}`);
    }

    bid(data)
    {
       
        return apiClient.post("/items/bid", data);
    }
}

export default new ItemService();