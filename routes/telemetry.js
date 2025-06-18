const express = require("express");
const router = express.Router();
const telemetrySchema = require("../models/telemetrySchema");

// Latest telemetry (default: last 100)
router.get("/latest", async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const data = await telemetrySchema
    .find()
    .sort({ timestamp: -1 })
    .limit(limit);
  res.json(data);
});

// Filter by threat detected
router.get("/threats", async (req, res) => {
  const data = await telemetrySchema.find({ threat_detected: true }).sort({
    timestamp: -1,
  });
  res.json(data);
});

module.exports = router;
