import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  uid: {type: String, required:true, default: null},
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
