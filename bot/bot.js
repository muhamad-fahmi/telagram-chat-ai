require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');
const bot = require('../webhooks/webhook');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const menuUtama = (msg) => {
	const menu = {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: 'Text Completion',
						callback_data: 'text_completion',
					},
					{
						text: 'Code Completion',
						callback_data: 'code_completion',
					},
				],
			],
		},
	};

	bot.sendMessage(msg.from.id, 'Menu Chat-AI (By Fahmi)', menu);
};

bot.onText(/\/start/, (msg) => {
	menuUtama(msg);
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
	const action = callbackQuery.data;

	if (action === 'text_completion') {
		bot.sendMessage(callbackQuery.from.id, '↩️ Masukan Pertanyaan :').then((res) => {
			bot.onReplyToMessage(res.chat.id, res.message_id, (msg) => {
				var pertanyaan = msg.text;
				bot.sendMessage(msg.from.id, 'loading ...').then(async (res) => {
					var response = await openai.createCompletion({
						model: 'text-davinci-003',
						prompt: `${pertanyaan}`,
						temperature: 0,
						max_tokens: 1000,
					});
					if (response) {
						bot.deleteMessage(res.chat.id, res.message_id);
						var balasan = response.data.choices[0].text;
						bot
							.sendMessage(msg.from.id, balasan, {
								reply_to_message_id: msg.message_id,
							})
							.then(() => {
								menuUtama(msg);
							});
					} else {
						bot.deleteMessage(res.chat.id, res.message_id);
						bot.sendMessage(msg.from.id, 'Bot tidak menjawab').then(() => {
							menuUtama(msg);
						});
					}
				});
			});
		});
	} else if (action === 'code_completion') {
		const menu = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Generate Code',
							callback_data: 'generate_code',
						},
						{
							text: 'Modify Code',
							callback_data: 'modify_code',
						},
					],
				],
			},
		};
		bot.sendMessage(callbackQuery.from.id, 'Pilih Opsi', menu);
	} else if (action === 'generate_code') {
		bot.sendMessage(callbackQuery.from.id, '↩️ Masukan Intruksi :').then((res) => {
			bot.onReplyToMessage(res.chat.id, res.message_id, (msg) => {
				var intruksi = msg.text;
				bot.sendMessage(msg.from.id, 'loading ...').then(async (res) => {
					var response = await openai.createCompletion({
						model: 'text-davinci-003',
						prompt: `${intruksi}`,
						temperature: 0,
						max_tokens: 1000,
					});
					if (response) {
						bot.deleteMessage(res.chat.id, res.message_id);
						var balasan = response.data.choices[0].text;
						bot
							.sendMessage(msg.from.id, balasan, {
								reply_to_message_id: msg.message_id,
							})
							.then(() => {
								menuUtama(msg);
							});
					} else {
						bot.deleteMessage(res.chat.id, res.message_id);
						bot.sendMessage(msg.from.id, 'Bot tidak menjawab').then(() => {
							menuUtama(msg);
						});
					}
				});
			});
		});
	} else if (action === 'modify_code') {
		let code = '';
		let intruksi = '';
		bot.sendMessage(callbackQuery.from.id, '↩️ Masukan Code :').then((res) => {
			bot.onReplyToMessage(res.chat.id, res.message_id, (msg_code) => {
				code = msg_code.text;
				if (code.length > 0)
					bot.sendMessage(callbackQuery.from.id, '↩️ Masukan Intruksi :').then((res) => {
						bot.onReplyToMessage(res.chat.id, res.message_id, (msg) => {
							intruksi = msg.text;
							if (intruksi.length > 0) {
								bot.sendMessage(msg.from.id, 'loading ...').then(async (res) => {
									var response = await openai.createEdit({
										model: 'code-davinci-edit-001',
										input: `${code}`,
										instruction: `${intruksi}`,
									});
									if (response) {
										bot.deleteMessage(res.chat.id, res.message_id);
										var balasan = response.data.choices[0].text;
										bot
											.sendMessage(msg.from.id, `<code>${balasan}</code>`, {
												parse_mode: 'html',
											})
											.then(() => {
												menuUtama(msg);
											});
									} else {
										bot.deleteMessage(res.chat.id, res.message_id);
										bot.sendMessage(msg.from.id, 'Bot tidak menjawab').then(() => {
											menuUtama(msg);
										});
									}
								});
							}
						});
					});
			});
		});
	}
});
