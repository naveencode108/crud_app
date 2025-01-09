import todoModel from '../models/todoModel.js';

export const create_todo = async (req, res) => {

    try {
        let userId = req.userId;
        const { text } = req.body;

        if (!userId) return res.json({
            success: false,
            message: 'Something went wrong!'
        })

        const newTodo = await todoModel.create({
            userId,
            task: text
        });

        if (!newTodo) return res.json({
            success: false,
            message: 'Something went wrong!'
        })

        let allTodo=await todoModel.find({userId});

        return res.json({ success: true, message: 'New Task Added',data:allTodo});

    }
    catch (er) {
        return res.json({
            success: false,
            message: er.message
        })
    }

}


export const read_todo = async(req, res) => {
     try{
        let userId=req.userId;

        let data=await todoModel.find({userId});

        if(!data) return res.json({success:false,message:'not data yet.'});

        return res.json({success:true,data:data});
     }
     catch(er){
        return res.json({success:false,message:er.message});
     }
}

export const delete_todo=async(req,res)=>{
    try{
       const {id}=req.params;
       const userId=req.userId;
       let deleteTodo=await todoModel.findByIdAndDelete(id);
       
       let allTodo=await todoModel.find({userId});

       return res.json({success:true,message:'Task Deleted' ,data:allTodo});
    }
    catch(er){
        return res.json({success:false,message:er.message});
    }
}

export const edit_todo=async(req,res)=>{
   try {
      
    let {id}=req.params;

    const {text}=req.body;

    let find=await todoModel.findOne({_id:id});

    find.task=text;

    await find.save();

    return res.json({success:true,message:"Task edit successfully"});
    

   } catch (er) {
      return res.json({success:false,message:er.message});
   }
}