import { Router } from "express";
import { getHotels, updateHotels } from "../controllers/HotelController";

const router = Router();

router.get("/hotels", getHotels);
router.post("/update-hotels", updateHotels);

export default router;
