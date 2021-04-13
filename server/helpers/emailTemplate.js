import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Email from "./email";

dotenv.config();


const {EMAIL_ADDRESS, EMAIL_PASSWORD} =process.env;
const transporter = nodemailer.createTransport({

    service:"gmail",
    secure:"true",

    auth:{
        user:EMAIL_ADDRESS,
        pass:EMAIL_PASSWORD
    }
    
})

class EmailHelper{

    static async userWelcomEmail(user){

        const info = await transporter.sendMail(Email.welcomEmail(user));
    }
}
export default EmailHelper;