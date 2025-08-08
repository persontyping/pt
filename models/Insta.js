const mongoose = require('mongoose');

const instaPostSchema = new mongoose.Schema(
  {
    // Keep the Instagram media id but store it under a canonical field
    instagramId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      alias: 'id', // lets you pass "id" in your JSON
    },

    type: {
      type: String,
      lowercase: true,
      enum: ['image', 'video', 'carousel'], // tolerant set; adjust if needed
    },

    shortcode: { type: String, required: true, unique: true, index: true },

    caption: String,

    hashtags: { type: [String], default: [] },
    mentions: { type: [String], default: [] },

    media_url: { type: String, required: true },
    thumbnail_url: String,

    media_type: { type: String }, // e.g., "IMAGE", "VIDEO", "CAROUSEL_ALBUM"

    timestamp: {
      type: Date,
      set: v => (v ? new Date(v) : v), // accepts the ISO8601 string
      index: true,
    },

    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },

    owner: {
      id: String,
      username: String,
      full_name: String,
      profile_picture_url: String,
    },

    location: {
      id: String,
      name: String,
      latitude: Number,
      longitude: Number,
    },

    permalink: String,
    is_video: Boolean,
  },
  {
    collection: 'meme', // use your existing collection
    timestamps: true,   // adds createdAt / updatedAt
    strict: true,
  }
);

// Helpful compound index for feeds/analytics (optional)
instaPostSchema.index({ 'owner.id': 1, timestamp: -1 });

module.exports = mongoose.model('InstaPost', instaPostSchema);
