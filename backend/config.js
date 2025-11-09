// Ajuste as variáveis abaixo conforme seu ambiente
module.exports = {
  MQTT_BROKER: process.env.MQTT_BROKER || 'mqtt://test.mosquitto.org',
  MQTT_TOPIC: process.env.MQTT_TOPIC || 'smart-energy/+/reading',
  INFLUX: {
    url: process.env.INFLUX_URL || '',
    token: process.env.INFLUX_TOKEN || '',
    org: process.env.INFLUX_ORG || '',
    bucket: process.env.INFLUX_BUCKET || ''
  },
  PORT: process.env.PORT || 3001
};
