// const mongoose=require("mongoose")
// const Schema=mongoose.Schema;

// const userSchema=new Schema({
//     email:{
//         type:String,
//         unique:true,
//         required:true,
//     },
//     username:{
//         type:String,
//         unique:true,
//         required:true,
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// const User=mongoose.model("User",userSchema)

// module.exports=User

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
