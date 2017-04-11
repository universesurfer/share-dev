const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: {
     type: String,
     enum : ['TRAVELER', 'HOST', 'BOTH'],
     default : 'TRAVELER'
   },
  description: String,
  phone: String,
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
