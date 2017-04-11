const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
  rating: Number,
  evaluation: String,
  date: Date,
  subject: String,
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  traveler: { type: Schema.Types.ObjectId, ref: 'User' },
  host: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});











const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
