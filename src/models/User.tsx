

import mongoose from "mongoose";

const { Schema } = mongoose



const userSchema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
    },
    { timestamps: true }
)


const modelName = mongoose.models.User || mongoose.model('User', userSchema)

export default modelName