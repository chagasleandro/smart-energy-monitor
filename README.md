# ⚡ Smart Energy Monitor – Monitoramento Inteligente de Energia com IoT

Sistema IoT desenvolvido para **monitorar o consumo de energia elétrica em tempo real**, identificar **picos de uso** e gerar **alertas automáticos**.  
Ideal para aplicações residenciais, comerciais e industriais com foco em **eficiência energética e sustentabilidade**. 🌱  

---

## 💡 Objetivo

O projeto busca promover o **uso inteligente da energia**, permitindo visualizar o consumo em tempo real e gerar **insights baseados em dados** para reduzir desperdícios e otimizar custos.

---

## ⚙️ Tecnologias Utilizadas

| Camada | Tecnologias |
|:--|:--|
| **Hardware** | ESP32, Sensor de Corrente SCT-013 |
| **Conectividade** | MQTT via Mosquitto |
| **Backend** | Node.js + InfluxDB |
| **Dashboard** | Grafana ou React.js |
| **Automação** | Alertas automáticos via Telegram ou e-mail |

---

## 📊 Funcionalidades

✅ Leitura em tempo real de tensão, corrente e potência  
✅ Cálculo do consumo total e custo estimado 💰  
✅ Armazenamento de séries temporais em InfluxDB  
✅ Dashboard interativo com gráficos e histórico  
✅ Alertas automáticos de sobrecarga ⚠️  

---

## 🧠 Arquitetura do Sistema

smart-energy-monitor/
<br/>├─ backend/ # API Node.js e integração MQTT/InfluxDB
<br/>├─ esp32/ # Código MicroPython do ESP32
<br/>├─ dashboard/ # Visualização de dados (React.js ou Grafana)
<br/>├─ README.md
<br/>└─ .gitignore

## 🚀 Como Rodar

### 🔹 Backend
```bash
cd backend
npm install
npm start
🔹 Dashboard (React.js)
bash
Copiar código
cd dashboard
npm install
npm start
🔹 ESP32
Configure o Wi-Fi e o broker MQTT no config.py.

Faça o upload dos arquivos via Thonny ou ampy.

📈 Resultados Esperados
Redução de custos com energia elétrica ⚡

Detecção de picos de consumo em tempo real

Histórico detalhado para análise de padrões

Base para automação residencial e eficiência energética

👨‍💻 Autor
Leandro Chagas
Especialista em Suporte Técnico, IoT e Monitoramento
🔗 LinkedIn
💻 GitHub

