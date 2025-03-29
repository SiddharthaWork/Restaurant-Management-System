import { model, Schema } from "mongoose";
import { MenuCategory, MenuItem } from "../types/menu.types";
import constants from "../constants";
import { Base, BaseSchema } from "../types/common.types";

//* MenuItemSize Model
export const foodSizeModel = model<Base>(constants.DB.FOODSIZE, BaseSchema);
export const beverageSizeModel = model<Base>(
  constants.DB.BEVERAGESIZE,
  BaseSchema
);

//* MenuCategory Model
const menuCategorySchema = new Schema<MenuCategory>({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.RESTAURANT,
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: [{ type: String }],
  type: { type: String, required: true, enum: ["food", "beverage"] },
});

export const MenuCategoryModel = model<MenuCategory>(
  constants.DB.MENUCATEGORY,
  menuCategorySchema
);

const menuItemSchema = new Schema<MenuItem>({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.RESTAURANT,
    required: true,
  },
  name: { type: String, required: true },
  tags: { type: [String], required: true },
  description: { type: String, required: true },
  photos: { type: [String], required: true },
  price: { type: Number, required: true },
  size: [
    {
      size: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  toppings: { type: [String] },
  category: {
    type: Schema.Types.ObjectId,
    ref: constants.DB.MENUCATEGORY,
    required: true,
  },
});

export const MenuItemModel = model<MenuItem>(constants.DB.MENU, menuItemSchema);
