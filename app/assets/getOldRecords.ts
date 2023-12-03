import axios from "axios";



export async function getOldRecords (id:string){
    const result = await axios.get(`http://localhost:3000/api/users/checkold/${id}`);
    return result.data;
}