import { Types } from "mongoose";
import { Base } from "./common.types";

interface MenuCategory extends Base {
  description: string;
  photo: string[];
  type: string;
  foodOrBeverage: "food" | "beverage"; // Use enum if needed
}
//* Menu Model
interface MenuItem extends Base {
  tags: string[];
  description: string;
  photos: string[];
  price: number;
  size: { [key: string]: number }; // For example, { small: 5, large: 8 }
  toppings: string[];
  category: Types.ObjectId; // Reference to MenuCategory
}
export { MenuCategory, MenuItem };