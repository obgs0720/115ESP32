const codeElement = document.querySelector('#arduinoCode');
const copyButton = document.querySelector('#copyCode');
const toast = document.querySelector('#toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function highlightCode(element) {
  const source = element.textContent;
  const escaped = source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const pattern = /(\/\/[^\n]*|"(?:[^"\\]|\\.)*"|#include|#define|\b(?:const|char|int|void|float|if|while|true|false|return)\b|\b(?:WiFi|WebServer|DHT|Serial|server|String|isnan|delay|setup|loop|handleRoot|begin|mode|status|localIP|send|on|println|print|readHumidity|readTemperature|handleClient)\b|\b\d+(?:\.\d+)?\b)/g;
  element.innerHTML = escaped.replace(pattern, token => {
    if (token.startsWith('//')) return `<span class="token-comment">${token}</span>`;
    if (token.startsWith('"')) return `<span class="token-string">${token}</span>`;
    if (token.startsWith('#')) return `<span class="token-directive">${token}</span>`;
    if (/^\d/.test(token)) return `<span class="token-number">${token}</span>`;
    if (/^(WiFi|WebServer|DHT|Serial|server|String|isnan|delay|setup|loop|handleRoot|begin|mode|status|localIP|send|on|println|print|readHumidity|readTemperature|handleClient)$/.test(token)) return `<span class="token-function">${token}</span>`;
    return `<span class="token-keyword">${token}</span>`;
  });
}

async function copyCode() {
  const text = codeElement.textContent.trim();
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      if (!copied) throw new Error('copy failed');
    }
    copyButton.textContent = '已複製！';
    showToast('程式碼已複製到剪貼簿');
  } catch {
    showToast('無法自動複製，請手動選取程式碼');
  }
  window.setTimeout(() => { copyButton.textContent = '複製程式碼'; }, 1800);
}

copyButton.addEventListener('click', copyCode);
highlightCode(codeElement);

