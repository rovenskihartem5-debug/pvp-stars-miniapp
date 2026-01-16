// miniapp/app.js
const tg = window.Telegram?.WebApp;

function isTelegramWebApp() {
  return !!tg;
}

function send(action, payload = {}) {
  if (!isTelegramWebApp()) {
    alert("Открой Mini App внутри Telegram (не через Safari).");
    return;
  }
  tg.sendData(JSON.stringify({ action, ...payload }));
}

function init() {
  if (isTelegramWebApp()) {
    tg.ready();
    tg.expand();
  }

  // Кнопки в мини-аппе
  const btnMenu = document.getElementById("btnMenu");
  const btnDuel = document.getElementById("btnDuel");
  const btnProfile = document.getElementById("btnProfile");
  const btnClans = document.getElementById("btnClans");
  const btnSendCmd = document.getElementById("btnSendCmd");
  const inputCmd = document.getElementById("inputCmd");

  if (btnMenu) btnMenu.addEventListener("click", () => send("open_menu"));
  if (btnDuel) btnDuel.addEventListener("click", () => send("open_duel"));
  if (btnProfile) btnProfile.addEventListener("click", () => send("open_profile"));
  if (btnClans) btnClans.addEventListener("click", () => send("open_clans"));

  if (btnSendCmd && inputCmd) {
    btnSendCmd.addEventListener("click", () => {
      const txt = (inputCmd.value || "").trim();
      if (!txt) return;
      send("custom_command", { text: txt });
      inputCmd.value = "";
    });
  }
}

document.addEventListener("DOMContentLoaded", init);