import express from 'express';
import BlogController from '../controller/BlogController';
import {verifyAuth} from "../middleware/authVerification";
import validator from "../middleware/validator";

const blogRouter = express.Router();

blogRouter.post('/create',verifyAuth, BlogController.createBlog);
blogRouter.get('/all',verifyAuth, BlogController.getAllBlogs);
blogRouter.get('/getOne/:id',verifyAuth, BlogController.getOneBlog);
blogRouter.delete('/delete/:id',verifyAuth, validator.verifyAccess, BlogController.deleteOneBlog);
blogRouter.patch('/update/:id',verifyAuth, validator.verifyAccess, BlogController.updateOne)
blogRouter.get('/getallfromapi',BlogController.getAllBlogsFromAPI);

export default blogRouter;

