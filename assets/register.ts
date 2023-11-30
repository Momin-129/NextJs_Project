import axios from "axios"
import { Register } from "./interfaces";



const register = async (data:Register)=>{
    const user = await axios.post("http://localhost:3000/api/register",data);
    return user.data;
}

export default register;