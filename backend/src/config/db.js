import mongoose from 'mongoose'


const connectDb=async()=>{
    try{

        let connect=await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB is connected');
    }
    catch(er){
        console.log(er.message);
    }

}


export default connectDb;