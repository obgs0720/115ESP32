window.SENSOR_DATA = {
  button: { code: "S01", level: "簡單", interface: "GPIO", title: "按鈕／微動開關", description: "最基本的數位輸入，學習按下、放開與防彈跳。", wiring: "GPIO27 → 按鈕 → GND，使用 INPUT_PULLUP", library: "不需外部函式庫", useCase: "啟動鍵、模式切換" },
  potentiometer: { code: "S02", level: "簡單", interface: "ADC", title: "可變電阻", description: "把旋鈕位置轉成類比數值，認識 ADC 讀值。", wiring: "兩端接 3V3／GND，中間腳 → GPIO34", library: "不需外部函式庫", useCase: "亮度旋鈕、音量控制" },
  ldr: { code: "S03", level: "簡單", interface: "ADC", title: "光敏電阻 LDR", description: "用分壓電路測量明暗，建立環境感測的第一步。", wiring: "LDR＋10kΩ 分壓，中點 → GPIO34", library: "不需外部函式庫", useCase: "自動夜燈、亮度告警" },
  pir: { code: "S04", level: "簡單", interface: "GPIO", title: "PIR 人體紅外線", description: "偵測移動事件，練習數位訊號與觸發動作。", wiring: "OUT → GPIO27；VCC／GND 依模組", library: "不需外部函式庫", useCase: "自動燈、入侵提醒" },
  dht11: { code: "S05", level: "簡單", interface: "1-WIRE", title: "DHT11 溫濕度", description: "讀取最常見的環境資料，適合搭配序列埠與 OLED。", wiring: "DATA → GPIO4、VCC → 3V3、GND", library: "DHT sensor library、Adafruit Unified Sensor", useCase: "教室環境監測", href: "./dht11.html" },
  "hc-sr04": { code: "S06", level: "中等", interface: "TIME", title: "HC-SR04 超音波", description: "由 Trig 發送、Echo 接收回波，計算物體距離。", wiring: "Trig → GPIO5；Echo → GPIO18，需降壓", library: "不需外部函式庫或 NewPing", useCase: "倒車雷達、避障車" },
  ds18b20: { code: "S07", level: "中等", interface: "1-WIRE", title: "DS18B20 防水溫度", description: "用單線匯流排連接一顆或多顆溫度探頭。", wiring: "DATA → GPIO4，DATA 與 3V3 間加 4.7kΩ", library: "OneWire、DallasTemperature", useCase: "水溫、土壤溫度" },
  "soil-moisture": { code: "S08", level: "中等", interface: "ADC", title: "土壤濕度", description: "讀取介質濕度，並注意電極腐蝕與供電電壓。", wiring: "AO → GPIO34、VCC／GND；不要直接輸入 5V", library: "不需外部函式庫", useCase: "自動澆水、盆栽監控" },
  mq2: { code: "S09", level: "中等", interface: "ADC", title: "MQ-2 瓦斯／煙霧", description: "以類比值觀察氣體濃度變化，先做相對量測。", wiring: "AO → ADC，模組輸出超過 3.3V 時需分壓", library: "不需外部函式庫", useCase: "環境警示、煙霧變化" },
  mpu6050: { code: "S10", level: "中等", interface: "I2C", title: "MPU6050 姿態", description: "讀取加速度與陀螺儀，開始理解角度和動態資料。", wiring: "SDA → 21、SCL → 22、VCC → 3V3、GND", library: "Wire、Adafruit MPU6050", useCase: "搖桿、計步、姿態控制" },
  bme280: { code: "S11", level: "中等", interface: "I2C", title: "BME280 氣壓環境", description: "同時量測溫度、濕度與氣壓，適合製作環境儀表。", wiring: "SDA → 21、SCL → 22；I2C 位址依模組", library: "Adafruit BME280、Wire", useCase: "氣象站、樓層高度估算" },
  bh1750: { code: "S12", level: "困難", interface: "I2C", title: "BH1750 光照度", description: "用標準單位 lux 讀取環境亮度，適合自動調光。", wiring: "SDA → 21、SCL → 22、VCC → 3V3、GND", library: "BH1750", useCase: "智慧照明、植物燈" },
  rc522: { code: "S13", level: "困難", interface: "SPI", title: "RC522 RFID", description: "讀取卡片 UID，練習 SPI 腳位與門禁邏輯。", wiring: "SCK18、MOSI23、MISO19、SDA/SS5、RST27", library: "MFRC522", useCase: "簽到、門禁、借閱" },
  inmp441: { code: "S14", level: "困難", interface: "I2S", title: "INMP441 數位麥克風", description: "用 I2S 取樣聲音，進一步做音量、頻譜或串流。", wiring: "BCLK → 26、WS → 25、SD → 33、3V3／GND", library: "ESP32 I2S API", useCase: "聲控、即時音訊" },
  neo6m: { code: "S15", level: "困難", interface: "UART", title: "NEO-6M GPS", description: "接收經緯度與時間資料，練習第二組 UART。", wiring: "GPS TX → ESP32 RX16；GPS RX → TX17", library: "TinyGPSPlus", useCase: "定位、軌跡記錄" },
  as608: { code: "S16", level: "困難", interface: "UART", title: "AS608 指紋模組", description: "從 UART 指令進入資料庫、比對與權限管理。", wiring: "模組 TX/RX 接 ESP32 UART，供電依模組", library: "Adafruit Fingerprint Sensor", useCase: "指紋門禁、身分辨識" },
  max30102: { code: "S17", level: "困難", interface: "UART", title: "光學心率感測器", description: "讀取脈搏與血氧類資料，適合用來練習資料清理。", wiring: "I2C 或 UART，依 MAX30102 模組版本", library: "MAX30105 / MAX3010x 系列函式庫", useCase: "生理資料展示" }
};
