import mongoose from "mongoose";

const { Schema } = mongoose;

const CardsSchema = new Schema({
  custom_field_id: String,
  title: String,
  items: [
    {
      title: String,
      excerpt: String,
      toOnClick: String,
      gradientColors: [String],
    },
  ],
});

export const Card = mongoose.model("Card", CardsSchema);
