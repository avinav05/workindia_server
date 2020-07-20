const ReservationSchema = new mongoose.Schema({
    movie_name: String,
    movie_slot: String,
    numberOfSeats: {
      type: Number,
    },
    seats: [{ row_name: String, seat_num: [Number] ,booked:[Number]}],
    reservedSeats: [{ email: { type: String, unique: true }, seat: [{ row: String, seat_num: [Number] }]}],
  }, { strict: false });

  module.exports = mongoose.model("MovieSchema", ReservationSchema);

