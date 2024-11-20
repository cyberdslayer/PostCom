import mongoose from 'mongoose';
import  Comment  from './schema_comments';

const PostSchema = new mongoose.Schema({
  uid:{type:String, required:true, default:null },
  content: { type: String, required: true },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: Comment, required:false}
  ],
},{
  timestamps:true
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
