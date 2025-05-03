(() => {
  let last;
  document.addEventListener('mouseover', e => {
    if (last) last.style.outline = '';
    last = e.target;
    last.style.outline = '2px solid rgba(255,0,0,.6)';
  }, true);

  document.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const el = e.target;
    const detail = {
      tag: el.tagName,
      id: el.id,
      classes: el.className,
      outerHTML: el.outerHTML
    };
    document.dispatchEvent(new CustomEvent('element-selected', { detail }));
  }, true);
})();
