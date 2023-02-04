import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getSpecificHotel } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getSpecificHotel);

export { hotelsRouter };
