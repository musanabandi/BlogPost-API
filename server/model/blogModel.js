
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {type:String, require:true},
    content: {type:String, require:true},
    
   userId: {
       type: mongoose.Schema.ObjectId,

    ref: "user",

    required:[true, "user is required"]
   
},

timeStamp: {
    type:String
},


commentsId:[{

    type:mongoose.Schema.ObjectId,
    ref:"comment",
}
]

});
 

blogSchema.pre(/^find/, function(next){

    this.populate({
        path:"userId",
        select:"firstName email"
    })
    

    this.populate({
        path: "userId",
        select: "firstName email"
    })
    

    this.populate({
        path: "commentsId",
        select: "content user timeStamp"
    })



    next();
});


const blogInfo = mongoose.model("blog",blogSchema);
export default blogInfo;

 

