import mongoose, { mongo } from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subtitle: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: '/assets/img/blog/havynlife.png'
    },
    year: {
        type: String,
        default: '@2026'
    },
    badge: {
        type: String,
    },
    githubUrl: {
        type: String,
        trim: true
    },
    liveUrl: {
        type: String,
        trim: true
    },

},
    {
        timestamps: true,
    }

);


// INDEX: Speeds up project filtering when filtering by category
projectSchema.index({
    category: 1
});

const Project = mongoose.model('Project', projectSchema);
export default Project;