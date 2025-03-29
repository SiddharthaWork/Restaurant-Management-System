import { AuthenticatedRequest, QueryOptions } from "../types/common.types";
import mongoose from "mongoose";

export const buildQuery = (
  req: AuthenticatedRequest,
  id?: string
): QueryOptions => {
  const query: QueryOptions = {};

  if (id) {
    query._id = id;
  }

  if (!req.user?.isSuperAdmin) {
    query.restaurant = req.user?.restaurant?.toString();
  } else if (req.query.restaurant) {
    query.restaurant = req.query.restaurant as string;
  }

  return query;
};

