
// Network check: drives the header status tag from navigator.onLine and its
// events without generating any network traffic. Browsers may force onLine to
// true for anti-fingerprinting (including Tor Browser), so true is UNVERIFIED,
// not proof that this computer is connected. False is shown as OFFLINE, but is
// still only the browser's report and not proof of an air gap.
(() => {
  const TAG_ID = "network-status";

  // The markup ships unverified, so a script-less or not-yet-checked page can
  // never claim an air gap.
  const setStatus = (online) => {
    const tag = document.getElementById(TAG_ID);
    if (!tag) return;
    tag.dataset.state = online ? "unverified" : "offline";
    tag.textContent = online ? "Unverified" : "Offline";
    const message = online
      ? "Network status unverified; browser reports online"
      : "Network status: browser reports offline; verify the air gap yourself";
    tag.setAttribute("aria-label", message);
    tag.setAttribute("title", message);
  };

  const checkNetwork = () => {
    setStatus(navigator.onLine === true);
  };

  checkNetwork();
  window.addEventListener("online", checkNetwork);
  window.addEventListener("offline", checkNetwork);
  // Chromium-only Network Information API: re-check on connection changes.
  navigator.connection?.addEventListener?.("change", checkNetwork);
})();
