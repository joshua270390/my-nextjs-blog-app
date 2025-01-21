import { Schema, model, models } from "mongoose";

//Creating post model using mongoose

//creating fields - schema
//constructor

const postSchema = new Schema({
    image: String,
    title: String,
    description: String,
    created_at: String
}, {toJSON: {virtuals: true} });

postSchema.virtual('short_desc').get(function(){
    return this.description.substr(0,50)+'...'
})

postSchema.virtual('modified_date_format').get(function(){
    return createModifiedDateFormat(this.created_at)
})

function createModifiedDateFormat(date_orginal){
      const newDate = new Date(date_orginal)
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

      return `${months[newDate.getMonth()]} ${newDate.getDate()} ${newDate.getFullYear()}`
}

//Creating model with schema

//already exists or not
const postModel = models.Post || model('Post',postSchema) // (model name, schema name which has already created before)

//export here
export default postModel