import { Schema, model } from "mongoose";
import { Restaurant } from "../types/restaurant.types";
import constants from "../constants";

// Define the Mongoose schema
const RestaurantSchema = new Schema<Restaurant>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  address: {type:String,required:true},
  phone:{type:String,required:true},
  description: { type: String, required: false },
  subStart: { type: Date, required: true },
  subEnd: { type: Date, required: true },
});

// Create the Mongoose model
const RestaurantModel = model<Restaurant>(constants.DB.RESTAURANT, RestaurantSchema);

export default RestaurantModel;
