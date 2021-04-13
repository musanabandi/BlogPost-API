

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    
    content: {
        type:String, 
        require:[true, "Please Provide  Content of Comment"]
    },
    

timeStamp: {
    type:Date,
    default: new Date(Date.now())
},

userId:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    require:[true, "Please Provide UserId"]
}
});
 

commentSchema.pre(/^find/, function(next){

    this.populate({
        path:"userID",
        select:"firstName email"
    })
    next();
});


const commentInfos = mongoose.model("comment",commentSchema);
export default commentInfos;

 

