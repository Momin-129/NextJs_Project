import axios from "axios";



export async function getOldRecords (id:string){
    const result = await axios.get(`${process.env.NEXTAUTH_URL}/api/users/checkold/${id}`);
    return result.data;
}