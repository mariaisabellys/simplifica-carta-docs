import type { MouseEvent } from "react";

export function shouldHandleInternalLink(event: MouseEvent<HTMLAnchorElement>) {
  const anchor = event.currentTarget;
  if (
    event.defaultPrevented || event.button !== 0 || event.metaKey ||
    event.ctrlKey || event.shiftKey || event.altKey ||
    anchor.hasAttribute("download") ||
    (anchor.target && anchor.target !== "_self")
  ) return false;

  try {
    const target = new URL(anchor.href, window.location.href);
    return target.origin === window.location.origin &&
      (target.protocol === "http:" || target.protocol === "https:");
  } catch {
    return false;
  }
}
