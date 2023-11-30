import axios from "axios"
import { User } from "./interfaces";



const login = async (data:User)=>{
    const user = await axios.post("http://localhost:3000/api/users/login",data);
    return user.data;
}

export default login;