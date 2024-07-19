import mongoose, { Types } from 'mongoose';

const FileModel = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },

  filename: {
    type: String,
    required: true,
  },

  mimetype: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('files', FileModel);
