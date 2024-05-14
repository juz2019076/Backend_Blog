import Comment from "./comments.model.js";
import Publications from "../publicaciones/publications.model.js";

export const createComment = async (req, res) => {
    const { publicationId, commenterName, commenterEmail, commentText } = req.body;

    try {
        const publication = await Publications.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }

        const newComment = new Comment({
            publicationId,
            commenterName,
            commenterEmail,
            commentText
        });

        await newComment.save();

        res.status(201).json({ comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCommentsByPublicationId = async (req, res) => {
    const { publicationId } = req.params;

    try {
        const comments = await Comment.find({ publicationId });

        res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
