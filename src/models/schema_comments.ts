import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
