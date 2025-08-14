const mongoose = require('mongoose');
const { Schema } = mongoose;

// --- Each media item inside a post ---
const MediaItemSchema = new Schema(
  {
    uri: { type: String, required: true, index: true },
    creation_timestamp: Number, // epoch seconds (from your JSON)
    timestamp: { type: Date, index: true }, // derived from creation_timestamp

    title: String,

    cross_post_source: {
      source_app: String, // e.g., "FB"
    },

    // present on some video entries
    dubbing_info: { type: [Schema.Types.Mixed], default: [] },
    media_variants: { type: [Schema.Types.Mixed], default: [] },

    // Derived/convenience
    is_video: Boolean,
    media_url: String, // mirrors uri for compatibility
  },
  { _id: false, strict: true }
);

// Normalization for media item
MediaItemSchema.pre('validate', function (next) {
  if (!this.timestamp && typeof this.creation_timestamp === 'number') {
    this.timestamp = new Date(this.creation_timestamp * 1000);
  }
  if (!this.media_url && typeof this.uri === 'string') {
    this.media_url = this.uri;
  }
  if (typeof this.is_video !== 'boolean' && typeof this.uri === 'string') {
    this.is_video = /\.(mp4|mov|m4v|webm)(\?|$)/i.test(this.uri);
  }
  if (this.title === '') this.title = undefined;
  next();
});

// --- Top-level post schema ---
const instaPostSchema = new Schema(
  {
    title: String,
    creation_timestamp: Number, // epoch seconds for the post
    timestamp: { type: Date, index: true }, // derived from creation_timestamp
    media: { type: [MediaItemSchema], default: [] },

    // Optional legacy fields for backwards compatibility
    instagramId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      alias: 'id',
    },
    type: { type: String, lowercase: true, enum: ['image', 'video', 'carousel'] },
    shortcode: { type: String, unique: true, sparse: true, index: true },
    caption: String,
    hashtags: { type: [String], default: [] },
    mentions: { type: [String], default: [] },

    media_url: String, // fallback
    thumbnail_url: String,
    media_type: String,

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
    is_video: Boolean, // doc-level convenience
  },
  {
    collection: 'meme',
    timestamps: true, // createdAt / updatedAt
    strict: true,
  }
);

// Normalization for post-level fields
instaPostSchema.pre('validate', function (next) {
  if (!this.timestamp && typeof this.creation_timestamp === 'number') {
    this.timestamp = new Date(this.creation_timestamp * 1000);
  }
  if (!this.media_url && Array.isArray(this.media) && this.media.length > 0) {
    this.media_url = this.media[0].media_url || this.media[0].uri;
  }
  if (typeof this.is_video !== 'boolean' && Array.isArray(this.media) && this.media.length > 0) {
    this.is_video = !!this.media[0].is_video;
  }
  if (this.title === '') this.title = undefined;
  next();
});

// Helpful indexes
instaPostSchema.index({ timestamp: -1 });
instaPostSchema.index({ 'media.timestamp': -1 });
instaPostSchema.index({ 'owner.id': 1, timestamp: -1 });

module.exports = mongoose.model('InstaPost', instaPostSchema);
