import express from "express";
import commentController from "../controller/commentController";
import {verifyAuth} from "../middleware/authVerification";

const commentRoute = express.Router();

commentRoute.post('/create/:id',verifyAuth, commentController.createComment);
commentRoute.get('/all',verifyAuth, commentController.getAllComments);
commentRoute.get('/getOne/:id',verifyAuth, commentController.getOneComment);
commentRoute.patch('/update/:id',verifyAuth, commentController.updateComment)
commentRoute.delete('/deleteComment/:id',verifyAuth, commentController.deleteComment);

export default commentRoute;