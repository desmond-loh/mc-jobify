import mongoose from 'mongoose';

const connectDB = function(url) {
    mongoose.set('strictQuery', false);
    return mongoose.connect(url);
};

export default connectDB;