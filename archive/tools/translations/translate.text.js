module.exports = {
  scrubText,
  stripTranslatorMarkup
};

// Replaces {{key}} with a div tag to prevent translation
function scrubText(text) {
  if (text.indexOf('{{') === -1) {
    return text;
  }

  return text.replace(/{{/g, '<span class="notranslate">').replace(/}}/g, '</span>');
}

// Strip the Microsoft Translator API "no translate" markup added to text
function stripTranslatorMarkup(content) {
  return content
    .replace(/<span class="notranslate">/g, ' {{').replace(/<\/span>/g, '}} ')
    .replace(/  +/g, ' ') // replace multiple spaces with a single space
    .trim();
}
