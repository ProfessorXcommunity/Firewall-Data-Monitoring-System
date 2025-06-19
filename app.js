const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const telemetry = require("./models/telemetrySchema");
require("dotenv").config();
const telemetryRoutes = require("./routes/telemetry");
const {
  client,
  firewallLogsTotal,
  firewallThreatsTotal,
  activeThreats,
} = require("./metrics_prom/metrics");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_CONNECTION_STRING;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    setInterval(updateMetrics, 5000);
  })
  .catch((err) => console.error(err));

app.use("/api/telemetry", telemetryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  res.send("Welcome to Firewall Telemetry Monitoring API!");
});

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
});

async function updateMetrics() {
  try {
    const totalLogs = await telemetry.countDocuments();
    const totalThreats = await telemetry.countDocuments({
      threat_detected: true,
    });

    firewallLogsTotal.set(totalLogs);
    firewallThreatsTotal.set(totalThreats);
    activeThreats.set(totalThreats);

    // console.log(
    //   `Metrics updated → Logs: ${totalLogs} | Threats: ${totalThreats}`
    // );
  } catch (err) {
    console.error("Error updating metrics:", err);
  }
}
