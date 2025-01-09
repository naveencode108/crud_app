import mongoose from 'mongoose'

const todoSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    task:{
        type:String,
        required:true,
        trim:true
    }
});

const todoModel=mongoose.model('todo',todoSchema);
export default todoModel;