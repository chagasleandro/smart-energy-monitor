const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let latestReadings = {};

let influxWriteApi = null;
if (config.INFLUX.url && config.INFLUX.token) {
  const influxDB = new InfluxDB({ url: config.INFLUX.url, token: config.INFLUX.token });
  influxWriteApi = influxDB.getWriteApi(config.INFLUX.org, config.INFLUX.bucket);
  console.log('InfluxDB configurado');
} else {
  console.log('InfluxDB não configurado — somente memória local');
}

const client = mqtt.connect(config.MQTT_BROKER);
client.on('connect', () => {
  console.log('Conectado ao MQTT broker', config.MQTT_BROKER);
  client.subscribe(config.MQTT_TOPIC, (err) => {
    if (err) console.error('Erro ao subscrever tópico', err);
    else console.log('Subscrito em:', config.MQTT_TOPIC);
  });
});

client.on('message', (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const parts = topic.split('/');
    const deviceId = parts.length >= 2 ? parts[1] : 'unknown';
    payload._receivedAt = new Date().toISOString();
    latestReadings[deviceId] = payload;
    if (influxWriteApi) {
      const p = new Point('energy')
        .tag('device', deviceId)
        .floatField('voltage', payload.voltage || 0)
        .floatField('current', payload.current || 0)
        .floatField('power', payload.power || 0)
        .intField('timestamp', Date.now());
      influxWriteApi.writePoint(p);
    }
    console.log('MQTT ->', deviceId, payload);
  } catch (e) {
    console.error('Erro ao processar mensagem MQTT', e);
  }
});

app.get('/api/latest', (req, res) => {
  res.json(latestReadings);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

const port = config.PORT;
app.listen(port, () => console.log(`Backend rodando na porta ${port}`));

process.on('SIGINT', async () => {
  console.log('Encerrando...');
  if (influxWriteApi) {
    try { await influxWriteApi.close(); } catch (err) { console.error(err); }
  }
  process.exit();
});
