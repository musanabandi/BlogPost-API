import commentInfos from "../model/commentModel";
import blogInfo from "../model/blogModel";
import Response from "../helpers/response";



class commentController {


    static createComment = async(req, res) => {

        let  content  = req.body.content;
        let blogIdFromParams = req.params.id;

        const newComment = await commentInfos.create(req.body);
        
        const blog = blogInfo.findByIdAndUpdate(
            
            blogIdFromParams,
            {
                $push: {
                    commentsId: newComment._id
                }})


            if(!blog){

                return Response.errorMessage(res,"Failed to create Comment",404)



                /*return res.status(404).json({
                    status:404,
                    error:"Failed to create Comment"
                })*/
            }

            const commentUpdate= await blogInfo.findById(blogIdFromParams);

            return Response.successMessage(res, "comment created successfully",{commentUpdate},200)

        /*return res.status(200).json({
            status: 200,
            message: "comment created successfully",
            data: commentUpdate
        })*/

    };

    //get all comment

    static getAllComments = async(req, res) => {
        
        const commentData = await commentInfos.find();

        return Response.successMessage(res, "This Is All Comment",{commentData},200)

        /*return res.status(200).json({
            status: 200,
            message: "This Is All Comment",
            data:commentData
        });*/
    }


    //get one comment

    
    static getOneComment = async (req, res) => {

        const commentId = req.params.id;

        const commentData = await commentInfos.findById( commentId)

        if (!commentData) {


            return Response.errorMessage(res,"Comment  failed to getone",417)

            /*return res.status(417).json({
                status: 417,
                message: "Comment  failed to getone",
            })*/
        }

        return Response.successMessage(res, "Comment  created succesfully",{commentData},201)

        /*return res.status(201).json({
            status: 201,
            message: "Comment  created succesfully",
            data:commentData
        })*/
    }   


    //update Comment

    
    static updateComment= async (req,res)=>{

        const commentId=req.params.id;

        let  content  = req.body.content;

        const timestamp= new Date(Date.now());

        const commentData= await commentInfos.findByIdAndUpdate(commentId, {

            content: content
        });

     if(!commentData){

        return Response.errorMessage(res,"Updated Comment Failed",404)

       /* return res.status(404).json({

            staus:404,
            message:"Updated Comment Failed"
        });*/
    }

    const CommentUpdate= await commentInfos.findById(commentId);

    return Response.successMessage(res, "Updated Comment Successfully",{CommentUpdate},201)

       /*return res.status(201).json({
 
           status:201,
           message:"Updated Comment Successfully",
           
          data:CommentUpdate
       })*/

        }



      //delete comment


      static deleteComment= async(req, res)=>{


        const commentId= req.params.id;
        const commentData= await commentInfos.findByIdAndDelete(commentId);


        if(!commentData){

            return Response.errorMessage(res,"comment delete failed",417)


           /* return res.status(417).json({
                status:417,
                message:'comment delete failed'
            });*/
        }

        return Response.successMessage(res, "comment delete succeessfully",{commentData},201)


        /*return res.status(200).json({
          status:200,
          message:'comment delete succeessfully'
      });*/
    
    }

}
export default commentController;