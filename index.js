(() => {
  // internal state -----------------------------------------------------------
  let active = false;   // starts disabled
  const debug = true;
  let last;             // last element we highlighted

  // helper to turn outline on / off for the current element -----------------
  const setOutline = (el, on) => {
    if (!el) return;
    el.style.outline = on ? '2px solid rgba(255,0,0,.6)' : '';
  };

  // mouse‑over handler -------------------------------------------------------
  const handleHover = e => {
    if (!active) return;
    setOutline(last, false);
    last = e.target;
    setOutline(last, true);
  };

  // click handler ------------------------------------------------------------
  const handleClick = e => {
    if (debug){
      console.log('Click was handled with value: ',e)
    }
    if (!active) return;
    e.preventDefault();
    e.stopPropagation();

    const el = e.target;
    const detail = {
      tag: el.tagName,
      id: el.id,
      classes: el.className,
      outerHTML: el.outerHTML
    };

    if (debug){
      console.log('Event was sent with value: ', detail)
    }

    const msg = {
      type: 'element-selected',
      detail
    };

    window.postMessage(msg);
    // document.dispatchEvent(new CustomEvent('element-selected', { detail }));
  };

  // message handler (coming from the host page) -----------------------------
  const handleMessage = e => {
    const { type, active: nextState } = e.data || {};
    if (type !== 'ELEMENT_PICKER_TOGGLE') return;

    if (debug){
      console.log('Picker status changed to: ', nextState)
    }
    active = Boolean(nextState);
    if (!active) {
      // tidy up any leftover outline
      setOutline(last, false);
      last = undefined;
    }
  };

  // wire up listeners --------------------------------------------------------
  document.addEventListener('mouseover', handleHover, true);
  document.addEventListener('click',      handleClick, true);
  window.addEventListener('message',      handleMessage);
})();
