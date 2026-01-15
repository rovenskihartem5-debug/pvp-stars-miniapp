// miniapp/app.js
console.log("PvP Stars Mini App loaded");

// Telegram WebApp init (без ошибок, даже если не в телеге)
const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

if (tg) {
  tg.ready();
  tg.expand();
}

function el(id) {
  return document.getElementById(id);
}

function showUser() {
  if (!tg) {
    el("user").innerText = "Opened outside Telegram";
    return;
  }

  const u = tg.initDataUnsafe?.user;
  if (!u) {
    el("user").innerText = "User not found (Telegram)";
    return;
  }

  el("user").innerText = `User: ${u.first_name || ""} ${u.last_name || ""} (@${u.username || "no_username"})`;
}

showUser();
