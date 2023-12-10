import axios from "axios"
import { Register } from "./interfaces";



const register = async (data:Register)=>{
    const user = await axios.post(`${process.env.NEXTAUTH_URL}/api/register`,data);
    return user.data;
}

export default register;