const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "TOKEN_BOT_KAMU";
const url = "URL_APPS_SCRIPT_KAMU";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/slot (.+)/, async (msg, match) => {
  const value = match[1];

  await axios.post(url, {
    type: "set",
    value: value
  });

  bot.sendMessage(msg.chat.id, `Slot diubah jadi: ${value}`);
});

bot.onText(/\/cek/, async (msg) => {
  const res = await axios.post(url, {
    type: "get"
  });

  bot.sendMessage(msg.chat.id, `Slot saat ini: ${res.data}`);
});
