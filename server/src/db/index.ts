import mongoose from 'mongoose';

export const connectDb = async () => {
    const url = process.env.MONGO_URI;
    try {
        const connectionInstance = await mongoose.connect(`${url}/car`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('Error connecting to the database: ', error);
        process.exit(1);
    }
    }