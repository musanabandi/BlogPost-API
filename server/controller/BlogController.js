import blogInfo from "../model/blogModel";
import Response from "../helpers/response";
import axios from "axios";

class BlogController {

    static getAllBlogsFromAPI = async(req, res)=>{

        try{

    const responseFromAPI = await axios.get('https://blogpost-api-shecancode.herokuapp.com/api/v1/blog/dash/all')

    return Response.successMessage(res, "Fetched successfully", responseFromAPI.data,200)

        }
        
        catch(e){

            console.log(e)
            return Response.errorMessage(res, "Failed to Fetch",403)
        }


    }




    static updateOne= async (req,res)=>{

        const blogId=req.params.id;

        let{
            title,
            content
        } =req.body;

        const data= await blogInfo.findByIdAndUpdate(blogId, {

            title: title,
            content: content
        });

     if(!data){

    return  Response.errorMessage(res,"Updated Failed",404) 

        /*return res.status(404).json({

            staus:404,
            message:"Updated Failed"
        });*/
    }


    const dataUpdate= await blogInfo.findById(blogId);
    return Response.successMessage(res, "Updated Successfully",{dataUpdate},201)
       /*return res.status(201).json({

           status:201,
           message:"Updated Successfully",
           
          data:dataUpdate
       })*/

        }

        


    static deleteOneBlog= async(req,res)=>{
        const blogId= req.params.id;

       

        const data = await blogInfo.findByIdAndDelete(blogId);
        
       
        if (!data) {


    return  Response.errorMessage(res,"Blog  Failed To Delete",417) 


            /*return res.status(417).json({
                status: 417,
                message: "Blog  Failed To Delete",
            })*/
        }

    return Response.successMessage(res, "Blog Deleted Succesfully",{data},201)

        /*return res.status(201).json({
            status: 201,
            message: "Blog Deleted Succesfully",
            data
        })*/
    }


    static getAllBlogs = async(req, res) => {
        
        const data = await blogInfo.find();


    return Response.successMessage(res, "This is All Blogs",{data},200)


        /*return res.status(200).json({
            status: 200,
            message: "this is all blogs",
            data:data
        });*/
    }
    

    static getOneBlog = async (req, res) => {

        const blogId = req.params.id;

        const data = await blogInfo.findById(blogId)

        if (!data) {

    return  Response.errorMessage(res,"blog  failed to getone",417) 


            /*return res.status(417).json({
                status: 417,
                message: "blog  failed to get",
            })*/
        }

    return Response.successMessage(res, "Blog  Created Succesfully",{data},201)

        /*return res.status(201).json({
            status: 201,
            message: "blog  created succesfully",
            data
        })*/
    }


    static createBlog = async(req, res) => {
        
        const timeStamp = new Date(Date.now());
        let {
            title,
            content,
            userId
        } = req.body;

        const data = await blogInfo.create(req.body);
        
        if (!data) {


        return  Response.errorMessage(res,"blog  failed to be registered",417) 
            
            /*return res.status(417).json({
                status: 417,
                message: "blog  failed to be registered",
            })*/
        }

        return Response.successMessage(res, "Blog  Created Succesfully",{data},201)

        /*return res.status(201).json({
            status: 201,
            message: "blog  created succesfully",
            data
        })*/


    }
}

export default BlogController;
