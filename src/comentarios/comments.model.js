import mongoose, { Schema } from "mongoose";

const CommentsSchema = new Schema({
    publicationId: {
        type: Schema.Types.ObjectId,
        ref: 'Publications',
        required: [true, 'Publication ID is required']
    },
    commenterName: {
        type: String,
        required: [true, 'Commenter name is required']
    },
    commenterEmail: {
        type: String,
        required: [true, 'Commenter email is required'],
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    commentText: {
        type: String,
        required: [true, 'Comment text is required']
    }
});

export default mongoose.model('Comment', CommentsSchema);
