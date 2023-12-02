import axios from "axios";
import { cycleDate } from "./interfaces";



export const addOldRecords = async (data:cycleDate) =>{
    const add = await axios.post("http://localhost:3000/api/users/addold",data);
    return add.data;
}