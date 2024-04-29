import mongoose from "mongoose";

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
//   coverImage: {
//     type: String,
//     required: true,
//   },
  // Additional fields can be added as needed
});

// Create the Book model using the schema
export default mongoose.model('Book', bookSchema);


