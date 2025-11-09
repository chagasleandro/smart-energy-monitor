"""Simula dispositivos publicando leituras MQTT para teste do backend.
Uso: python3 simulate_publish.py
"""
import time, json, random
import paho.mqtt.client as mqtt

BROKER = 'test.mosquitto.org'
TOPIC_TEMPLATE = 'smart-energy/{}/reading'

client = mqtt.Client()
client.connect(BROKER, 1883, 60)

devices = ['esp32-01','esp32-02','esp32-03']

try:
    while True:
        for d in devices:
            voltage = 230.0 + random.uniform(-5,5)
            current = random.uniform(0.1, 5.0)
            power = round(voltage * current, 2)
            payload = {'device': d, 'voltage': round(voltage,2), 'current': round(current,3), 'power': power}
            topic = TOPIC_TEMPLATE.format(d)
            client.publish(topic, json.dumps(payload))
            print('Publicado', topic, payload)
        time.sleep(5)
except KeyboardInterrupt:
    print('Fim da simulação')
