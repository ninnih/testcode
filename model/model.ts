const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        id: { type: String, required: true },
        projectName: { type: String, required: true },
        type: { type: String, required: true },
        year: { type: String, required: true },
        tags: { type: [String], required: true },
        image: { type: String, required: true },
        gallery: { type: [String], required: true },
        thumbnail: { type: [String], required: true },
        description: { type: String, required: true },
        favourite: { type: Boolean, required: true },
        github: { type: String, required: false },
        link: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('projects', Project)
