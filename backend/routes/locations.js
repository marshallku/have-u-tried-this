import { Router } from "express";
import { getAll } from "../services/locations";
import asyncHandler from "../utils/async-handler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const locations = await getAll();
    res.json(locations);
  }),
);

export default router;
