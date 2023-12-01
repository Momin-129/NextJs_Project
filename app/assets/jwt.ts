import jwt,{ JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn?:string | number
}

const DEFAULT_SIGN_OPTION:SignOption = {
    expiresIn:"30d"
}

export function signJwtAccessToken(paylod:JwtPayload,options:SignOption=DEFAULT_SIGN_OPTION){
    const secret_key = process.env.JWT_KEY;
    const token = jwt.sign(paylod,secret_key!,options);
    return token;
}

export function verifyJwt (token:string){
    try {
        const secret_key = process.env.JWT_KEY;
        const decode = jwt.verify(token,secret_key!);
        return decode as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}