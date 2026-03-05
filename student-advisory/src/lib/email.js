import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

//function hantar email
export async function sendResetEmail(email, resetLink){
    try{
        await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to : email,
            subject : "Reset Password",
            html : `<p>Click link below to reset your password</p>
        <a href="${resetLink}">Reset Password</a>`
        })
    }catch(error){
        alert("Email error", error)
        console.log(error)
    }
}