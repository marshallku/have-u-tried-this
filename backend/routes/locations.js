const { Router } = require("express");
const router = Router();

const asyncHandler = require("../utils/async-handler");
const locationService = require("../services/locations");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const locations = await locationService.getAll();
    res.json(locations);
  }),
);

module.exports = router;
