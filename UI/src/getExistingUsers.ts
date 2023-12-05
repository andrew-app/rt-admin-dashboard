import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserDetails } from "./UserTypes";


  
const fetchUsers: () => Promise<UserDetails[]> = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_USER_SERVICE || '';
    const response = await axios.get(`${API_BASE_URL}/api/v1/users`);
    return response.data.users;
}

export const GetExistingUsers = () => useQuery(['existingUsers'], fetchUsers, { staleTime: Infinity });