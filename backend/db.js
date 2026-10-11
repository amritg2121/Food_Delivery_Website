const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false);

// Cache the connection so serverless invocations reuse it
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

const mongoDB = async () => {
    if (cached.conn) return cached.conn;
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set");
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 8000,
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }
    return cached.conn;
};

module.exports = mongoDB;
