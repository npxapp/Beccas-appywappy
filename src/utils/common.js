// utils/common.jsx
export const getDomain = (href = document.baseURI || window.location.href) => {
  const url = new URL(href);
  return url.hostname;
};

export const generateCopy = async (text) => {
  try {
    // Primary method using Clipboard API
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus({ preventScroll: true });
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      document.body.removeChild(textArea);
      return false;
    }
  } catch (err) {
    console.error('Copy failed', err);
    return false;
  }
};

