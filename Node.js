const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "8957620029:AAEy6XqsblPjwBT-oi-jr09vKwaE0HAfYKI";
const url = "https://script.google.com/macros/s/AKfycbxG7LUGndlUD7H38YthEEAchRvRUlmrXJxmu1GemGFanbHE6fb--M4j7EPtmVK5GnXDDA/exec";

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
