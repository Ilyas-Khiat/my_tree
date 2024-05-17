import mongoose from 'mongoose';

const UnionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  partner: { type: [String], required: true },
  children: { type: [String], default: [] }
});

const Union = mongoose.model('Union', UnionSchema);
export default Union;
