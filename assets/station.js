const stationSwitch = document.querySelector(".station-switch");
const rail = document.querySelector(".rail");
const stationName = stationSwitch.querySelector(".station-name");
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const stops = [
  { short: "Kotti", full: "Kottbusser Tor" },
  { short: "Görli", full: "Görlitzer Bahnhof" }
];
let station = 0;
let teaser;

function ride() {
  window.clearTimeout(teaser);
  station = 1 - station;
  const here = stops[station];
  const next = stops[1 - station];
  rail.dataset.end = String(station);
  stationSwitch.dataset.end = String(station);
  stationName.textContent = here.short;
  stationSwitch.title = "Send the U1 to " + next.full;
  stationSwitch.setAttribute("aria-label", here.full + ". " + stationSwitch.title);
}

stationSwitch.hidden = false;
rail.dataset.end = "0";
stationSwitch.addEventListener("click", ride);

// One passing train on the first homepage visit in this tab.
if (document.body.classList.contains("page-home") && !motion.matches) {
  try {
    if (!sessionStorage.getItem("u1-first-ride")) {
      sessionStorage.setItem("u1-first-ride", "seen");
      teaser = window.setTimeout(() => {
        if (document.hidden || motion.matches || stationSwitch.matches(":focus, :hover")) return;
        ride();
      }, 3800);
    }
  } catch {
    // The station button also works when browser storage is disabled.
  }
}
