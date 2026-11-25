const copyButton = document.querySelector('#copyCode');
const toast = document.querySelector('#toast');
const codeElement = document.querySelector('#arduinoCode');

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

copyButton.addEventListener('click', async () => {
  try {
    await copyText(document.querySelector('#arduinoCode').textContent.trim());
    copyButton.textContent = '已複製！';
    showToast('程式碼已複製到剪貼簿');
  } catch {
    showToast('無法自動複製，請手動選取程式碼');
  }
  window.setTimeout(() => { copyButton.textContent = '複製程式碼'; }, 1800);
});

highlightArduinoCode(codeElement);

