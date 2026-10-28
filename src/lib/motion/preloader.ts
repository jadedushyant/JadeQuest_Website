/**
 * The preloader announces when it has finished (or was skipped) so intro
 * timelines, like the home hero, can wait for it.
 */
export const PRELOADER_DONE_EVENT = "preloader:done";
export const PRELOADER_SESSION_KEY = "jq-preloaded";

let done = false;

export function markPreloaderDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
}

/** Runs `callback` once the preloader is gone. Returns an unsubscribe function. */
export function onPreloaderDone(callback: () => void) {
  if (done) {
    callback();
    return () => {};
  }
  window.addEventListener(PRELOADER_DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE_EVENT, callback);
}
