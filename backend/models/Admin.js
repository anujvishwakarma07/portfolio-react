import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }
);


adminSchema.index({username : 1});
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;