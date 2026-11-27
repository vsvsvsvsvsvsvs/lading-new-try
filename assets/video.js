const playLink = document.getElementById("play-film");

playLink.addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();

  const player = document.createElement("iframe");
  player.title = document.getElementById("film-title").textContent;
  player.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
  player.allowFullscreen = true;
  player.referrerPolicy = "strict-origin-when-cross-origin";
  player.src = "https://www.youtube-nocookie.com/embed/l4XDV3Oilhw?autoplay=1&playsinline=1";
  playLink.replaceWith(player);
  player.focus();
});
