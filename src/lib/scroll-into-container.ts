/** Scroll an element within its overflow parent only — never the page. */
export function scrollElementIntoContainer(el: HTMLElement) {
  if (el.offsetParent === null) return;

  const container = el.parentElement;
  if (!container) return;

  const elRect = el.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();

  if (elRect.top < cRect.top) {
    container.scrollTop -= cRect.top - elRect.top;
  } else if (elRect.bottom > cRect.bottom) {
    container.scrollTop += elRect.bottom - cRect.bottom;
  }
}
