const sensorId = document.body.dataset.sensor;
const sensor = window.SENSOR_DATA?.[sensorId];
const root = document.querySelector("#sensor-detail-app");

if (sensor && root) {
  root.innerHTML = `
    <section class="sensor-detail-hero section-pad">
      <div><p class="eyebrow"><span class="eyebrow-dot"></span>感應器 / ${sensor.code} · ${sensor.level}</p><h1>${sensor.title}<br /><em>ESP32 實作頁。</em></h1><p class="hero-text">${sensor.description}</p></div>
      <div class="sensor-detail-mark"><span>${sensor.interface}</span><strong>${sensor.code}</strong><small>ONE SENSOR · ONE PAGE</small></div>
    </section>
    <section class="sensor-detail-section section-pad"><div class="section-heading"><div><p class="eyebrow">01 / 快速資訊</p><h2>先確認接線與資料介面</h2></div></div><div class="sensor-info-grid"><article><span>介面</span><strong>${sensor.interface}</strong></article><article><span>常見接線</span><strong>${sensor.wiring}</strong></article><article><span>函式庫</span><strong>${sensor.library}</strong></article><article><span>可做應用</span><strong>${sensor.useCase}</strong></article></div></section>
    <section class="sensor-detail-section sensor-detail-soft section-pad"><div class="sensor-detail-columns"><article><p class="eyebrow">02 / 實作流程</p><h2>從讀值開始，再延伸成作品</h2><p>${sensor.description} 建議先完成單一感測器讀值，再加入顯示器、LED、蜂鳴器或 Wi‑Fi 上傳。</p><ol class="sensor-steps"><li>確認模組電壓與 ESP32 共地。</li><li>依照接線資訊連接訊號腳位。</li><li>安裝所需函式庫並執行最小範例。</li><li>觀察序列埠資料，再加入實際應用。</li></ol></article><div class="sensor-detail-check"><b>維修檢查清單</b><span>□ 電源電壓正確</span><span>□ GND 共地</span><span>□ 訊號腳位沒有接反</span><span>□ 函式庫版本已確認</span></div></div></section>
    <section class="sensor-detail-section section-pad"><div class="section-heading"><div><p class="eyebrow">03 / 下一步</p><h2>把這個感測器接進專題</h2></div></div><div class="sensor-next-grid"><article><b>顯示</b><p>搭配 OLED 或 LCD 顯示即時資料。</p></article><article><b>控制</b><p>依照感測值控制 LED、蜂鳴器、風扇或繼電器。</p></article><article><b>連線</b><p>使用 Wi‑Fi、MQTT 或網頁儀表板查看資料。</p></article></div><a class="button button-primary sensor-back-link" href="../sensors.html">← 回到感應器索引</a></section>`;
}
