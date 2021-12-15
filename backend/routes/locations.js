/* eslint-disable import/extensions */
import { Router } from "express";
import { getAll } from "../services/locations.js";
import asyncHandler from "../utils/async-handler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const locations = await getAll();
    res.json(locations);
  }),
);

export default router;
