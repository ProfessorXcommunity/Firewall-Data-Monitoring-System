const client = require("prom-client");

client.collectDefaultMetrics();

const firewallLogsTotal = new client.Gauge({
  name: "firewall_logs_total",
  help: "Current total number of firewall telemetry logs ingested",
});

const firewallThreatsTotal = new client.Gauge({
  name: "firewall_threats_total",
  help: "Current total number of firewall telemetry logs where threats were detected",
});

const activeThreats = new client.Gauge({
  name: "firewall_active_threats",
  help: "Current number of active threats in telemetry data",
});

module.exports = {
  client,
  firewallLogsTotal,
  firewallThreatsTotal,
  activeThreats,
};
