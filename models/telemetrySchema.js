const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
  timestamp: Date,
  firewall_id: String,
  source_ip: String,
  destination_ip: String,
  source_port: Number,
  destination_port: Number,
  protocol: String,
  action: String,
  bytes_sent: Number,
  bytes_received: Number,
  rule_id: String,
  threat_detected: Boolean,
  threat_name: String,
});

module.exports = mongoose.model("Telemetry", telemetrySchema, "firewall");
