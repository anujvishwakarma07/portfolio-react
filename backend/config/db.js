import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10, //Keep up to 10 open connections, ready to handle concurrent traffic
            minPoolSize: 2, //atleast 2 active
            socketTimeoutMS: 4500, //close socket after 45 of inactivity to save database resources
            serverSelectionTimeoutMS: 5000, //fast fail if database is unreachable (timeout in 5 second instead of hung requests)
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`);

    } catch (error) {
        console.log(`Database connection error :  ${error.message}`);
        process.exit(1);
    }

};

export default connectDB;