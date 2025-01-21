import mongoose from 'mongoose';

const connectMongodb = async() => mongoose.connect(process.env.MONGO_DB)

export default connectMongodb