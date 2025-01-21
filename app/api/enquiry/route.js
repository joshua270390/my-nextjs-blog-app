import connectMongodb from "@/utils/connectMogodb";
import enquiryModel from "@/models/enquiryModel";

export async function POST(req){

    try{

        const{name,email,message} = await req.json(); // fields destructure
        const enquiry = {name,email,message} //create enquiry object {name:name,email:email,message:message}
        await connectMongodb()
        const enquiryData = await enquiryModel.create(enquiry)
        return Response.json({message: "Enquiry has been sent successfully"})

    } catch(err){
        return Response.json({message: err._message})
    }
     
}