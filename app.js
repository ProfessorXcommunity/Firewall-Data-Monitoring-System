const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const telemetryRoutes = require("./routes/telemetry");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI =
  "mongodb+srv://arijitkumar2912:telem1234$@telem.ewaybqu.mongodb.net/";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/telemetry", telemetryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  res.send("Welcome to Firewall Telemetry Monitoring API!");
});
