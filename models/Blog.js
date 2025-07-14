const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  excerpt: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'blog' }); // 👈 this forces Mongoose to use the correct collection


module.exports = mongoose.model('Blog', blogPostSchema);
