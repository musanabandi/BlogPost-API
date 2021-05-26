import UserData from '../model/UserModel';
import { generateAuthToken } from "../helpers/token";
import bcrypt from "bcrypt";
import EmailHelper from "../helpers/emailTemplate";
import Response from "../helpers/response";


class UserController {


    static changePassword = async (req,res)=>{
        let {
            oldPassword,
            newPassword,
            confirmPassword
        }=req.body;

        const userId = req.body.userId;
        const userDetails = await UserData.findById(userId);
        console.log(userDetails)

        if(bcrypt.compareSync(oldPassword, userDetails.password)){

            if(newPassword === confirmPassword){

                const password = bcrypt.hashSync(newPassword, 10);
                const passwordChangedTime = Date.now()
                const userUpdated = await UserData.findByIdAndUpdate(userId,{

                    password:password,
                    passwordChangedTime: passwordChangedTime


                })
        return Response.successMessage(res,"Password Has Changed",userUpdated,200)
            }
        return Response.errorMessage(res, "New Password And Confirm Password Not Match",404)
        }
        return Response.errorMessage(res, "Old Password Provided Is Invalid",417)

    }

    

    static signup = async (req, res) => {
      
        let {
            firstName,
            lastName,
            email,
            gender,
            password,
            confirmPassword,
            jobRole,
            department,
            address,
            country

        } = req.body;


        password = bcrypt.hashSync(password, 10)

        const isEmailExist = await UserData.findOne({email:email});

        if (isEmailExist) {

           return  Response.errorMessage(res,"Email Is Duplicated",409) 

            /*return res.status(409).send({ statu: 409, error: "email is duplicated" })*/
        }

        req.body.password= password;
        const data = await UserData.create(req.body);



        if (!data) {

            return Response.errorMessage(res,"Signup Failed",417)

            /*return res.status(417).json({
                status: 417,
                message: "signup failed",
            })*/
        }

        else {
            let { password, ...userData } = data._doc;

            await EmailHelper.userWelcomEmail(userData);

           return Response.successMessage(res, "Account Created Succesfully",{userData},201)


            /*return res.status(201).json({
                status: 201,
                message: "Account created succesfully",
                data: userData
            })*/
        }


    }

    static signin = async (req, res) => {


        let { email, password } = req.body;

        const isUserExist =await UserData.findOne({email:email});

        if (isUserExist && bcrypt.compareSync(password, isUserExist.password)) {

            const data = isUserExist;

            //generating token

            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                jobRole: data.jobRole,
                passwordChangedTime: data.passwordChangedTime
            });

            let { password, ...userData } = data._doc;


           return  Response.successMessage(res, " Login Created Succesfully",{token},201)

            /*return res.status(201).json({
                status: 201,
                message: "Account Login succesfully",
                token,
                data: userData
            })*/
        }


        
        return Response.errorMessage(res,"Password User Entered Is Incorrect!",404)

        /*return res.status(404).json({
            status: 404,
            message: "Password User Entered Is Incorrect!",

        })*/

    }

}

export default { UserController};