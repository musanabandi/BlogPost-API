import { check, validationResult } from "express-validator";
import blogInfo from "../model/blogModel";
import Response from "../helpers/response";
class validator {

    //  umuntu yemerewe ku deleting post ye gusa
    static verifyAccess = async (req, res, next) => {


        const userIdFromToken = req.body.userId;
        const blogIdFromParams = req.params.id;

        const blog = await blogInfo.findById(blogIdFromParams);

        if (!blog) {

            return Response.errorMessage(res,"Blog Not Exist",404)

            /*return res.status(404).json({
                status: 404,
                message: "Blog Not Exist"
            })*/
        }

        else if (userIdFromToken == blog.userId._id) {
            return next();

        }

        return Response.errorMessage(res,"You Are Not Authorised",401)

        /*return res.status(401).json({
            status: 401,
            message: "You Are Not Authorised"
        });*/

    }

    // user enter collect information (validation)

    static newAccountRules() {

        return [check("email", "Email is not Valid").isEmail(),
        check("firstName", "FirstName must be Invalid").isAlpha(),
        check("lastName", "LastName must be Invalid").isAlpha(),
        check("password", "Password must be Strong").isStrongPassword(),
        check("gender", "gender should be male or female").isIn(["male", "female"]),
        check("role", "role must be user or admin").isIn(["user", "admin"])];
    }

    static newSignInRules() {

        return [check("email", "Email is not Valid").isEmail(),
        check("password", "Password must be Strong").isStrongPassword()];
    }

    // user agomba kudasiga empty space

    /**
     * validate input
     * @body data inputs
     *
     * @return {Object} error description or return next middleware
     */

    static validateInput = (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessage = errors.errors.map(e => e.msg);

            return Response.errorMessage(res,"errorMessage",400)

           /* return res.status(400).json({
                status: 400,
                error: errorMessage,
            })*/
        }

        return next();
    }

}
export default validator;