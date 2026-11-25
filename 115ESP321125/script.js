const toast = document.querySelector('#toast');
const status = document.querySelector('#status');
const codeElement = document.querySelector('#arduinoCode');
const states = [
  { id: 'simGreen', text: '目前：綠燈，車輛可以通行', duration: 5000 },
  { id: 'simYellow', text: '目前：黃燈，請減速注意', duration: 2000 },
  { id: 'simRed', text: '目前：紅燈，車輛請停止', duration: 5000 }
];
let timer = null;
let stateIndex = 0;

function highlightArduinoCode(element) {
  const rawCode = element.textContent;
  const escaped = rawCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tokenPattern = /(\/\/[^\n]*|"(?:[^"\\]|\\.)*"|#include|#define|\b(?:const|int|void|float|if|while|true|false|HIGH|LOW|return)\b|\b(?:digitalWrite|pinMode|delay|Serial|lcd|dht|Wire|isnan|begin|print|println|setCursor|clear|backlight|readHumidity|readTemperature)\b|\b\d+(?:\.\d+)?\b)/g;
  element.innerHTML = escaped.replace(tokenPattern, (token) => {
    if (token.startsWith('//')) return `<span class="token-comment">${token}</span>`;
    if (token.startsWith('"')) return `<span class="token-string">${token}</span>`;
    if (token.startsWith('#')) return `<span class="token-directive">${token}</span>`;
    if (/^\d/.test(token)) return `<span class="token-number">${token}</span>`;
    if (/^(digitalWrite|pinMode|delay|Serial|lcd|dht|Wire|isnan|begin|print|println|setCursor|clear|backlight|readHumidity|readTemperature)$/.test(token)) return `<span class="token-function">${token}</span>`;
    return `<span class="token-keyword">${token}</span>`;
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function paintLight(index) {
  stateIndex = index;
  states.forEach((state, current) => {
    const lamp = document.getElementById(state.id);
    const color = state.id.replace('sim', '').toLowerCase();
    lamp.className = current === index ? `active ${color}` : color;
  });
  status.textContent = states[index].text;
}

function runCycle() {
  paintLight(stateIndex);
  timer = window.setTimeout(() => {
    stateIndex = (stateIndex + 1) % states.length;
    runCycle();
  }, states[stateIndex].duration);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('copy failed');
}

document.querySelector('#run').addEventListener('click', () => {
  if (!timer) runCycle(); else showToast('紅綠燈正在循環中');
});
document.querySelector('#stop').addEventListener('click', () => {
  window.clearTimeout(timer);
  timer = null;
  paintLight(0);
  showToast('已重設為綠燈');
});
document.querySelector('#copyCode').addEventListener('click', async (event) => {
  try {
    await copyText(document.querySelector('#arduinoCode').textContent.trim());
    event.currentTarget.textContent = '已複製！';
    showToast('程式碼已複製到剪貼簿');
  } catch {
    showToast('無法自動複製，請手動選取程式碼');
  }
  window.setTimeout(() => { event.currentTarget.textContent = '複製程式碼'; }, 1800);
});
paintLight(0);
highlightArduinoCode(codeElement);

