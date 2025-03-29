import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { loginSchema, registerSchema } from "../zod_schema/authSchema";
import constants from "../constants";
import { formatResponse } from "../utilities/formatRes";

import { AuthenticatedRequest } from "../types/common.types";
import { handleUserFiles, UploadedFiles } from "../utilities/fileHandler";
import createUserPermissions from "../utilities/createPermission";
import Logger from "../../utils/logUtils";
import { handleRestaurantAssignment } from "../utilities/restaurant";

import { Types } from "mongoose";
const register = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const data = await registerSchema.parseAsync(req.body);

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      formatResponse(res, 400, false, "Email already in use.");
      return;
    }

    // Handle file uploads
    const files = req.files as UploadedFiles;
    const { profileImgPath, docPaths } = await handleUserFiles(files);

    // Handle restaurant assignment
    const restaurant = await handleRestaurantAssignment(req);
    if (!restaurant.success) {
      formatResponse(
        res,
        400,
        false,
        restaurant.message || "Restaurant assignment failed"
      );
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, constants.SALT);

    const userData = {
      ...data,
      password: hashedPassword,
      profileImg: profileImgPath,
      docs: docPaths,
      joinDate: new Date(),
      restaurant: restaurant.id,
      time: { to: data.to, from: data.from },
    };

    const newUser = new User(userData);
    const savedUser = await newUser.save();
    if (savedUser._id && savedUser.restaurant._id) {
      await createUserPermissions(
        savedUser._id.toString(),
        savedUser.userRole,
        savedUser.restaurant._id as Types.ObjectId
      );
    }

    const { password, ...userResponse } = savedUser.toObject();
    formatResponse(
      res,
      201,
      true,
      "User registered successfully.",
      userResponse
    );
  } catch (error) {
    Logger.error("Registration error:", error);
    formatResponse(res, 500, false, "Error registering user.", error);
  }
};

const login = async (req: any, res: Response): Promise<void> => {
  try {
    const data = await loginSchema.parseAsync(req.body);
    const user = await User.findOne({ email: data.email }).populate("empRole");

    if (!user) {
      formatResponse(res, 400, false, "User not found.");
      return;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      formatResponse(res, 401, false, "Invalid credentials.");
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isSuperAdmin: user.isSuperAdmin,
        restaurant: user.restaurant,
      },
      constants.JWT_SECRET,
      { expiresIn: "1d" }
    );
    formatResponse(res, 200, true, "Login successful.", {
      token: token,
      user: {
        id:user._id,
        name:user.name,
        profile:user.profileImg,
        userRole:user.userRole,
        empRole:user.empRole
      },
    });
  } catch (error) {
    Logger.error("Login error:", error);
    formatResponse(res, 500, false, "Error logging in.", error);
  }
};

//* Create SUPERADMIN
const adminSeeder = async () => {
  try {
    //* Check if a default admin already exists
    const existingAdmin = await User.findOne({
      isSuperAdmin: true,
    });
    if (existingAdmin) {
      Logger.info("Default admin user already exists.");
      return;
    }
    const email = constants.SUPERADMIN.email;
    const password = constants.SUPERADMIN.password;
    if (!email || !password) {
      Logger.error(
        "Please set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASS in .env file"
      );
    }
    //* Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    //* Create the admin user
    const adminUser = new User({
      name: "SuperAdmin",
      userRole: constants.USERROLE.SUPERADMIN,
      isSuperAdmin: true,
      password: hashedPassword,
      address: "Admin Address",
      phone: "1234567890",
      email: email,
      DOB: new Date("1990-01-01"),
      gender: "Male",
      docs: [],
      profileImg: "",
      joinDate: new Date(),
      position: null,
      time: { from: "09:00", to: "17:00" },
      salary: 0,
      paidLeave: 0,
    });

    await adminUser.save();
    Logger.info("Default admin user created successfully.");
  } catch (error: any) {
    Logger.error("Error seeding admin user:", error.message);
  }
};

export default { register, login, adminSeeder };
