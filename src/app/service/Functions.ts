export function processHTML(
  html: string,
  wrapperClass: string = 'body-wrapper'
): string {
  let content = html;

  content = content.replace(
    /<body([^>]*)>/i,
    `<div class="${wrapperClass}"><body$1>`
  );
  content = content.replace(/<\/body>/i, '</body></div>');

  // Find all occurrences of <style> tags and their contents
  const styleRegex = /<style[^>]*>((.|\n|\r\n)*?)<\/style>/gi;
  let match;
  let modifiedContent = '';

  // Iterate through each <style> tag and its content
  while ((match = styleRegex.exec(content)) !== null) {
    const styleTag = match[0]; // The full <style> tag
    const styleContent = match[1]; // The content inside <style> tags

    // Replace class selectors preceded by } or start of line with wrapperClass
    const modifiedStyleContent = styleContent.replace(
      /(^|})([^{@][^{]*)(\{)/g,
      `$1.${wrapperClass} $2$3`
    );

    // Append the modified <style> tag with updated content
    modifiedContent += styleTag.replace(styleContent, modifiedStyleContent);
  }

  // Replace original <style> tags with modified <style> tags
  content = content.replace(styleRegex, modifiedContent);

  return content;
}
