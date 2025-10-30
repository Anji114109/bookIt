import { Schema, model } from 'mongoose';

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
});

export default model('Experience', ExperienceSchema);