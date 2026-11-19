import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  targetAudience: { type: String, default: 'Startup Investors' },
  analyses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Analysis' }],
}, {
  timestamps: true
});

export const Project = mongoose.model('Project', projectSchema);
export default Project;
