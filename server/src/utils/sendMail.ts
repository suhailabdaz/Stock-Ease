import { sendMail } from "../services/nodeMailer";
import otpGenerator  from "otp-generator" 


export const sendOtp=async(email:string,name:string)=>{
    try {
        const otp = otpGenerator.generate(6, { 
            digits: true, 
            upperCaseAlphabets: false, 
            specialChars: false, 
            lowerCaseAlphabets: false 
        });
        console.log("this is otp ",otp);
        const subject = "Otp Verification";
        const text = `Hello ${name},\n\nThank you for registering with real Time application!, your OTP is ${otp}\n\nHave a nice day!!!`;
        sendMail(email, subject, text).catch((error) => {
            console.error("Error sending email:", error);
        });
        return otp
    } catch (error) {
        console.log(error);
        return null
    }
}