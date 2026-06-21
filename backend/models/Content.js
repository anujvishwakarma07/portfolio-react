import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    section: {
        type: String,   //"hero", "about"
        required: true,
    },
    key: {
        type: String, //"mainTitle". "description"
        required: true
    },
    value: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true,
    }

);

contentSchema.index({ section: 1, key: 1 }, { unique: true });

const Content = mongoose.model("Content", contentSchema);
export default Content;