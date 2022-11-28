import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: String
}, {
    timestamps: true,
},
);

export default mongoose.model('Post', PostSchema);
