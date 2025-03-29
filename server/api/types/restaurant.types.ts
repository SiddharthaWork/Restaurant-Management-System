import { Document } from "mongoose";

export interface Restaurant extends Document {
  name: string; 
  address:string;
  phone:string;
  logo: any;
  description: string; 
  subStart: Date; 
  subEnd: Date; 
}
