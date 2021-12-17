/* eslint-disable import/extensions */
import { Router } from "express";
import { getAll } from "../services/locations.js";
import asyncHandler from "../utils/async-handler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 9;

    const locations = await getAll(page, perPage);
    res.json(locations);
  }),
);

export default router;
