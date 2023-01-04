const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const url = process.env.APP_URL;
const port = process.env.APP_PORT;
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const bot = new TelegramBot(TOKEN);

bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

app.use(express.json());

app.post(`/bot${TOKEN}`, (req, res) => {
	bot.processUpdate(req.body);
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Express server is listening on ${port}`);
});

module.exports = bot;
