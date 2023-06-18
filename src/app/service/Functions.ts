export function processHTML(html: string, wrapperClass: string = 'body-wrapper'): string {
  let content = html;
  content = content.replace(
    /<body([^>]*)>/i,
    `<div class="${wrapperClass}"><body$1>`
  );
  content = content.replace(/<\/body>/i, '</body></div>');
  content = content.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/g,
    (match, p1, p2, p3) => {
      const modifiedRules = p2.replace(
        /(^|\})([^{]+)(\{)/g,
        `$1.${wrapperClass} $2$3`
      );
      return `${p1}${modifiedRules}${p3}`;
    }
  );
  return content;
}
