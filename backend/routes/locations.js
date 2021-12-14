const { Router } = require("express");
const router = Router();

const locationService = require("../services/locations");

router.get("/", async (req, res) => {
  const locations = await locationService.getAll();
  res.json(locations);
});

module.exports = router;
