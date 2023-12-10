import axios from "axios";
import { cycleDate } from "./interfaces";



export const addOldRecords = async (data:cycleDate) =>{
    const add = await axios.post(`${process.env.NEXTAUTH_URL}/api/users/addold`,data);
    return add.data;
}