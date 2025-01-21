import connectMongodb from "../../../utils/connectMogodb";
import postModel from "../../../models/postModel";

export async function GET(req){
    //for getting search query
    const query = req.nextUrl.searchParams.get('q')
// error handling using try catch 
// preventing issues during db failed or something else happen in the code
    try{
        // connect DB
        await connectMongodb(); //promise //from utils
        let postData;
        if(query){
            postData = await postModel.find({
                $or: [  //or operator
                    {title: new RegExp(query, 'i')},  //constructor
                    {description: new RegExp(query, 'i')}
                ]
            })
        } else {
            postData = await postModel.find({}) //find - to get data //from model //store data
        }
        //to return data // Response.json provided in next js
        return Response.json(postData)
    } catch(error) {
       Response.json({message: error.message})
    }
     
}