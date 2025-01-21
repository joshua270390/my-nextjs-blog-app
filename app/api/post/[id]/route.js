import connectMongodb from "../../../../utils/connectMogodb";
import postModel from "../../../../models/postModel";

export async function GET(req, {params}){
// error handling using try catch 
// preventing issues during db failed or something else happen in the code
    try{
        // connect DB
        await connectMongodb(); //promise //from utils
        const postData = await postModel.findOne({_id: params.id}) //find - to get data //from model //store data
        //to return data // Response.json provided in next js
        return Response.json(postData)
    } catch(error) {
       Response.json({message: error.message})
    }
     
}