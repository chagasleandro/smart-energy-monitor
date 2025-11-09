# MicroPython: exemplo de leitura do SCT-013 e publicação MQTT
import time
import json
import network
from umqtt.simple import MQTTClient
from machine import ADC, Pin
import config

# Conectar Wi-Fi
sta_if = network.WLAN(network.STA_IF)
if not sta_if.isconnected():
    print('Conectando a rede...')
    sta_if.active(True)
    sta_if.connect(config.WIFI_SSID, config.WIFI_PASS)
    while not sta_if.isconnected():
        time.sleep(1)
print('Conectado. IP:', sta_if.ifconfig()[0])

# Configura ADC (ajuste conforme sua placa)
adc = ADC(Pin(config.ADC_PIN))
try:
    adc.atten(ADC.ATTN_11DB)  # full range
except:
    pass

# Função para leitura do SCT-013 (exemplo com média de amostras)
def read_current():
    samples = 200
    total = 0
    for _ in range(samples):
        total += adc.read_u16()
    avg = total / samples
    # Converter leitura ADC para tensão (MicroPython on ESP32: 0-65535 -> 0-Vref)
    voltage = (avg / 65535.0) * config.VREF
    # Calcular corrente aproximada: depende do circuito com resistor de carga
    # I = V / R_load   (quando SCT-013 usado com resistor)
    current = voltage / config.SENSOR_R_LOAD * config.CT_RATIO
    return current

def read_voltage_estimate():
    # Se não tiver sensor de tensão, podemos estimar ou colocar valor fixo
    return 230.0

def read_power():
    v = read_voltage_estimate()
    i = read_current()
    p = v * i
    return v, i, p

client = MQTTClient(config.DEVICE_ID, config.MQTT_BROKER, port=config.MQTT_PORT)
client.connect()
print('Conectado ao broker MQTT')

while True:
    v, i, p = read_power()
    payload = {
        'device': config.DEVICE_ID,
        'voltage': round(v, 2),
        'current': round(i, 3),
        'power': round(p, 2)
    }
    topic = config.MQTT_TOPIC_TEMPLATE.format(device_id=config.DEVICE_ID)
    client.publish(topic, json.dumps(payload))
    print('Publicado:', topic, payload)
    time.sleep(10)
