import jwt from "jsonwebtoken";

export function generateToken(payload){
    //kita buat token baru
    return jwt.sign(
        payload, //data user yang kita nk simpan
        process.env.JWT_SECRET, //secret key untuk jwt => for sign and verify token
        {expiresIn:"1h"}
    )
}

export function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}