import mongoose from 'mongoose';

const ClothingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['shirt', 'pants', 'outerwear']
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  weatherSuitability: {
    cold: { type: Boolean, default: false },
    cool: { type: Boolean, default: false },
    mild: { type: Boolean, default: false },
    warm: { type: Boolean, default: false },
    hot: { type: Boolean, default: false }
  },
  rainSuitable: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Clothing', ClothingSchema);