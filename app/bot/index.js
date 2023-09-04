const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = "6673876379:AAHBMnmRynznzyJns1tEhSc2SU56XBFQkwM";

module.exports = () => {
  const bot = new TelegramBot(token, { polling: true });

  // const btn = new MenuButtonDefault();
  // Matches "/echo [whatever]"

  bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp + " " + chatId);
  });

  bot.onText(/\/start/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.setChatMenuButton(chatId);

    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Some button text 1", callback_data: "1" }],
          [{ text: "Some button text 2", callback_data: "2" }],
          [{ text: "Some button text 3", callback_data: "3" }],
        ],
      }),
    };

    bot.sendMessage(chatId, "Starting bot...", options);
  });

  bot.on("callback_query", (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    let text;

    if (action === "1") {
      text = "You hit button 1";
    } else if (action === "2") {
      text = "2";
    } else {
      text = "3";
    }

    bot.editMessageText(text, opts);
  });

  // bot.on("message", (msg) => {
  //   const chatId = msg.chat.id;

  //   // send a message to the chat acknowledging receipt of their message
  //   bot.sendMessage(chatId, "Received your message");
  // });
};
