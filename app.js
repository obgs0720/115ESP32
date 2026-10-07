const lessonData = {
  beginner: {
    eyebrow: "推薦起點 · 簡單",
    title: "第一個作品：讓 LED 閃爍",
    description: "從最少的零件開始，理解 GPIO 輸出、限流電阻，以及 setup() 和 loop() 的角色。",
    tags: ["GPIO", "Arduino IDE", "數位輸出"]
  },
  intermediate: {
    eyebrow: "推薦起點 · 中等",
    title: "把環境溫度顯示出來",
    description: "用 DHT11 讀取溫度與濕度，再透過序列埠觀察資料，建立感測器教學的固定流程。",
    tags: ["DHT11", "序列埠", "感測資料"]
  },
  advanced: {
    eyebrow: "推薦起點 · 困難",
    title: "讓感測資料連上 Wi‑Fi",
    description: "從 Wi‑Fi 連線、資料格式到遠端服務，理解 ESP32 如何把小電路延伸成 IoT 系統。",
    tags: ["Wi‑Fi", "HTTP / MQTT", "IoT"]
  }
};

const cards = document.querySelectorAll(".level-card");
const featuredEyebrow = document.querySelector(".featured .eyebrow");
const featuredTitle = document.querySelector("#featured-title");
const featuredDescription = document.querySelector("#featured-description");
const tagContainer = document.querySelector(".lesson-tags");
const changeLessonButton = document.querySelector("#change-lesson");
let currentLesson = "beginner";

function showLesson(level) {
  const lesson = lessonData[level];
  if (!lesson) return;
  currentLesson = level;
  cards.forEach((card) => card.classList.toggle("is-selected", card.dataset.level === level));
  featuredEyebrow.textContent = lesson.eyebrow;
  featuredTitle.textContent = lesson.title;
  featuredDescription.textContent = lesson.description;
  tagContainer.innerHTML = lesson.tags.map((tag) => `<span>${tag}</span>`).join("");
}

cards.forEach((card) => card.addEventListener("click", () => showLesson(card.dataset.level)));

if (changeLessonButton) {
  changeLessonButton.addEventListener("click", () => {
    const levels = Object.keys(lessonData);
    const next = levels[(levels.indexOf(currentLesson) + 1) % levels.length];
    showLesson(next);
    document.querySelector(".featured").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".module-card").forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.type !== filter);
    });
  });
});

document.querySelectorAll(".level-filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".level-filter").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const level = button.dataset.level;
    document.querySelectorAll(".catalog-card").forEach((card) => {
      card.classList.toggle("is-hidden", level !== "all" && card.dataset.level !== level);
    });
  });
});

function addPhotoVisual(element, photo) {
  if (!element || !photo || element.querySelector(".card-visual")) return;
  const visual = document.createElement(photo.type === "image" ? "a" : "div");
  visual.className = `card-visual photo-visual ${photo.className}`;
  if (photo.type === "image") {
    visual.href = photo.href;
    visual.setAttribute("aria-label", `${photo.alt}，開啟教學頁`);
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = "lazy";
    image.decoding = "async";
    visual.append(image);
  } else {
    visual.setAttribute("aria-hidden", "true");
    visual.style.backgroundImage = `url("${photo.src}")`;
    visual.style.backgroundSize = `${photo.columns * 100}% ${photo.rows * 100}%`;
    visual.style.backgroundPosition = `${photo.x}% ${photo.y}%`;
  }
  element.prepend(visual);
}

function photoCell(src, columns, rows, index, className) {
  const column = index % columns;
  const row = Math.floor(index / columns);
  const x = columns === 1 ? 0 : (column / (columns - 1)) * 100;
  const y = rows === 1 ? 0 : (row / (rows - 1)) * 100;
  return { src, columns, rows, x, y, className };
}

const modulePhotos = [
  ...Array.from({ length: 8 }, (_, index) => photoCell("./assets/modules-photo-basic.png", 4, 2, index, "photo-modules-basic")),
  ...Array.from({ length: 5 }, (_, index) => photoCell("./assets/modules-photo-advanced.png", 4, 2, index, "photo-modules-advanced"))
];
const sensorImageFiles = [
  ["button", "按鈕／微動開關", "./sensor-pages/button.html"],
  ["potentiometer", "可變電阻", "./sensor-pages/potentiometer.html"],
  ["ldr", "光敏電阻 LDR", "./sensor-pages/ldr.html"],
  ["pir", "PIR 人體紅外線", "./sensor-pages/pir.html"],
  ["dht11", "DHT11 溫濕度", "./sensor-pages/dht11.html"],
  ["hc-sr04", "HC-SR04 超音波", "./sensor-pages/hc-sr04.html"],
  ["ds18b20", "DS18B20 防水溫度", "./sensor-pages/ds18b20.html"],
  ["soil-moisture", "土壤濕度", "./sensor-pages/soil-moisture.html"],
  ["mq2", "MQ-2 瓦斯／煙霧", "./sensor-pages/mq2.html"],
  ["mpu6050", "MPU6050 姿態", "./sensor-pages/mpu6050.html"],
  ["bme280", "BME280 氣壓環境", "./sensor-pages/bme280.html"],
  ["bh1750", "BH1750 光照度", "./sensor-pages/bh1750.html"],
  ["rc522", "RC522 RFID", "./sensor-pages/rc522.html"],
  ["inmp441", "INMP441 數位麥克風", "./sensor-pages/inmp441.html"],
  ["neo6m", "NEO-6M GPS", "./sensor-pages/neo6m.html"],
  ["as608", "AS608 指紋模組", "./sensor-pages/as608.html"],
  ["max30102", "光學心率感測器", "./sensor-pages/max30102.html"]
];
const sensorPhotos = sensorImageFiles.map(([slug, alt, href]) => ({
  type: "image",
  src: `./assets/sensors/${slug}.png`,
  href,
  alt,
  className: "photo-sensors-individual"
}));
const catalogPhotos = location.pathname.includes("sensors.html") ? sensorPhotos : modulePhotos;
document.querySelectorAll(".catalog-card").forEach((card, index) => addPhotoVisual(card, catalogPhotos[index]));

const sensorPageLinks = [
  "./sensor-pages/button.html",
  "./sensor-pages/potentiometer.html",
  "./sensor-pages/ldr.html",
  "./sensor-pages/pir.html",
  "./sensor-pages/dht11.html",
  "./sensor-pages/hc-sr04.html",
  "./sensor-pages/ds18b20.html",
  "./sensor-pages/soil-moisture.html",
  "./sensor-pages/mq2.html",
  "./sensor-pages/mpu6050.html",
  "./sensor-pages/bme280.html",
  "./sensor-pages/bh1750.html",
  "./sensor-pages/rc522.html",
  "./sensor-pages/inmp441.html",
  "./sensor-pages/neo6m.html",
  "./sensor-pages/as608.html",
  "./sensor-pages/max30102.html"
];

document.querySelectorAll(".catalog-card").forEach((card, index) => {
  const heading = card.querySelector("h3");
  const href = sensorPageLinks[index];
  if (!heading || !href) return;
  const existingLink = heading.querySelector("a");
  if (existingLink) {
    existingLink.href = href;
    return;
  }
  const link = document.createElement("a");
  link.className = "catalog-card-link";
  link.href = href;
  link.textContent = heading.textContent;
  heading.replaceChildren(link);
});

const codePhotos = Array.from({ length: 6 }, (_, index) => photoCell("./assets/code-photo-scenes.png", 3, 2, index, "photo-code-scenes"));
document.querySelectorAll(".code-topic").forEach((topic, index) => addPhotoVisual(topic, codePhotos[index]));

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".copy-code-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    const code = target.textContent;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const helper = document.createElement("textarea");
      helper.value = code;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
    }

    const originalText = button.textContent;
    button.textContent = "已複製 ✓";
    button.classList.add("is-copied");
    window.setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("is-copied");
    }, 1600);
  });
});
