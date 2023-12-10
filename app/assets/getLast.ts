import axios from "axios";

export async function getLastRecord (id:string){
    const result = await axios.get(`${process.env.NEXTAUTH_URL}/api/users/getlast/${id}`);
    return result.data;
}