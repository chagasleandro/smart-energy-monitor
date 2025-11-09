# Ajuste seus dados Wi-Fi e broker MQTT aqui
WIFI_SSID = 'YOUR_WIFI_SSID'
WIFI_PASS = 'YOUR_WIFI_PASS'
MQTT_BROKER = 'test.mosquitto.org'
MQTT_PORT = 1883
MQTT_TOPIC_TEMPLATE = 'smart-energy/{device_id}/reading'
DEVICE_ID = 'esp32-01'
ADC_PIN = 34  # exemplo de pino ADC
SAMPLE_COUNT = 1000
VREF = 3.3  # tensão de referência do ADC
CT_RATIO = 100  # relação do transformador de corrente (ex: 100A/50mA -> ajuste conforme seu sensor)
SENSOR_R_LOAD = 33.0  # resistor de carga em ohms usado com SCT-013 (se aplicável)
