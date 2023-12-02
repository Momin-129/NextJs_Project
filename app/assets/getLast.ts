import axios from "axios";

export async function getLastRecord (id:string){
    const result = await axios.get(`http://localhost:3000/api/users/getlast/${id}`);
    return result.data;
}