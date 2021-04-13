import {dataFromToken} from "../helpers/token";
import userData from "../model/UserModel"
import Response from "../helpers/response";

export const verifyAuth =async (req,res,next)=>{

    const token = req.header("x-auth-token");

    if(!token){


        return Response.errorMessage(res,"No Token Provided",404)

        

        /*return res.status(404).json({
            status:404,
            errror: "No Token provided"
        })*/
    }

    try{

        const user = dataFromToken(token).payload;
        const data = await userData.findById(user.id);
    
        if(!data){

            return Response.errorMessage(res,"Please Provide True Credentials",404)

            /*return res.status(404).json({
                status:404,
                error:"you are not a user"
            })*/
        }

        if(user.passwordChangedTime != data.passwordChangedTime){
            return Response.errorMessage(res,"Please re_Login, Password Has Been Changed",404);
        }
    
        
        req.body.userId =user.id;
    
         return next();
    
    
    }catch(e)
    
    {
        console.log(e)

        return Response.errorMessage(res,"Invalid Token",404)

       /* return res.status(404).json({
            Status: 404,
            Error: 'invalid token'
    
          });*/
    }

}