import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthyear: { type: Number },
  deathyear: { type: Number },
  own_unions: { type: [String], default: [] },
  parent_union: { type: String },
  birthplace: { type: String },
  deathplace: { type: String }
});

const Person = mongoose.model('Person', PersonSchema);
export default Person;
