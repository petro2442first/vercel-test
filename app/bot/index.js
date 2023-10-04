import { Telegraf, Markup, session, Context } from "telegraf";

import config from "../config/telegram.config";
import User from "../models/user.model";
import { MorApi } from "../libs/mor-api";
import { BlockBeeApi } from "../libs/blockbee-api";
import Transaction from "../models/transaction.model";

export default () => {
  class TgUser {
    static id = null;
    static transactionHash = null;
    static isSuccessPayment = false;

    static async auth(token, chatId) {
      const user = await User.findOne({ telegramToken: token });
      if (user) {
        if (!user.isAuthorizedThroughTelegram) {
          user.isAuthorizedThroughTelegram = true;
        }
        user.chats ??= [];
        console.log(chatId);
        user.chats.push(chatId);
        TgUser.id = user._id;
        await user.save();
        return true;
      } else return false;
    }
    static async checkAuth(chatId) {
      let users = await User.find({});

      for (let i = 0; i < users.length; i++) {
        if (users[i].chats.includes(chatId)) {
          TgUser.id = users[i]._id;

          return true;
        }
      }

      return false;
    }
  }

  class SessionStore {
    isAuth = false;
  }

  class RCContext extends Context {
    session = new SessionStore();
  }

  const authorizedKeyboard = Markup.keyboard([
    [config.text.buttons.balance, config.text.buttons.deposit],
    [config.text.buttons.statistics],
  ])
    .resize()
    .oneTime();

  const notAuthorizedKeyboard = Markup.keyboard([
    [config.text.buttons.authorization],
  ])
    .resize()
    .oneTime();

  const bot = new Telegraf(config.token, {
    contextType: RCContext,
  });

  bot.use(session());

  async function checkPayment(ctx) {
    const delay = 10000;

    (async function check() {
      const transaction = await Transaction.findOne({
        hash: TgUser.transactionHash,
      }).exec();
      if (transaction) {
        await ctx.reply("Оплата прошла успешно!");
        return;
      }
      setTimeout(check, delay);
    })();
  }

  const authMiddleware = async (ctx, next) => {
    if (TgUser.id) {
      return next();
    } else {
      const chat = await ctx.getChat();
      const isAuth = await TgUser.checkAuth(chat.id);
      if (isAuth) {
        return next();
      } else {
        await ctx.reply("Вы не авторизованы", notAuthorizedKeyboard);
      }
    }
  };

  bot.start(async (ctx) => {
    if (!TgUser.id) {
      await ctx.reply(
        "Добро пожаловать в RocketCall Bot!",
        notAuthorizedKeyboard
      );
    }
  });

  bot.command("quit", async (ctx) => await ctx.leaveChat());

  bot.hears(config.text.buttons.statistics, authMiddleware, async (ctx) => {
    // await ctx.reply("Статистика(в разработке)", authorizedKeyboard);
    const user = await User.findById(TgUser.id).exec();
    if (user) {
      const morRequest = await MorApi.getQuickStat({ username: user.login });

      const data = morRequest.page.quickstats;
      let responseData = "Статистика за сегодня";
      responseData += "\n";
      responseData += "\n";

      const today = data?.today;
      if (today) {
        responseData += `Звонков: ${today.calls}`;
        responseData += "\n";
        responseData += `Длительность звонков: ${today.duration}`;
        responseData += "\n";
      }

      const month = data?.today;
      if (today) {
        responseData += `Звонков: ${today.calls}`;
        responseData += "\n";
        responseData += `Длительность звонков: ${today.duration}`;
        responseData += "\n";
      }

      const activeCalls = data?.active_calls;
      if (activeCalls) {
        responseData += "\n";
        responseData += `Активных звонков: ${activeCalls.total}`;
        responseData += "\n";
        responseData += `Отвеченных звонков: ${activeCalls.answered_calls}`;
        responseData += "\n";
      }

      await ctx.reply(responseData, authorizedKeyboard);
    }
  });
  bot.hears(config.text.buttons.deposit, authMiddleware, async (ctx) => {
    // await ctx.reply("Депозит(в разработке)", authorizedKeyboard);
    await ctx.reply("Введите сумму пополнения: ");

    ctx.session ??= { depositInit: false };
    ctx.session.depositInit = true;
  });

  bot.hears(/^\d+$/, async (ctx) => {
    if (ctx.session && ctx.session.depositInit) {
      const paymentValue = Number(ctx.update.message.text);
      // const user = await User.findById(TgUser.id);
      // const morRequest = await MorApi.createPayment({
      //   userId: user.morId,
      //   username: user.login,
      //   amount: paymentValue,
      // });
      // console.log(morRequest);
      const bb = new BlockBeeApi(
        TgUser.id,
        "https://rocket-web-c7e333242ae0.herokuapp.com/api/payment/transaction-info"
      );

      const paymentDetails = await bb.getPaymentDetails(paymentValue);

      TgUser.transactionHash = bb.hash;

      paymentDetails.qrCode = Buffer.from(paymentDetails.qrCode, "base64");

      await ctx.replyWithMediaGroup([
        {
          type: "photo",
          media: { source: paymentDetails.qrCode },
          caption: "QR-код для пополнения на указанную сумму",
        },
      ]);
      await ctx.replyWithMarkdownV2(
        `Адрес для пополнения: \`${paymentDetails.address}\`\nСумма к оплате с учётом комиссии: \`${paymentDetails.amount.withFee}\``,
        authorizedKeyboard
      );

      await checkPayment(ctx);
    }
  });

  // GET BALANCE
  bot.hears(config.text.buttons.balance, authMiddleware, async (ctx) => {
    const user = await User.findById(TgUser.id);

    const balance = await MorApi.getBalance({ username: user.login });
    if (user) {
      await ctx.reply(
        config.text.responses.balance(balance),
        authorizedKeyboard
      );
    }
    const chat = await ctx.getChat();

    TgUser.checkAuth(chat.id);
  });
  // --------------

  // AUTHORIZATION
  bot.hears(config.text.buttons.authorization, async (ctx) => {
    if (TgUser.id) {
      await ctx.reply("Вы уже авторизованы", authorizedKeyboard);
    } else {
      await ctx.replyWithHTML(/* html */ `
      <b>Чтобы авторизоваться, отправьте Ваш токен авторизации.</b>
<i>Его можно получить в личном кабинете RocketCall.</i>`);
    }
  });

  bot.hears(/^rc_/, async (ctx) => {
    if (!TgUser.id) {
      await ctx.reply("Проверка токена...");

      const token = ctx.update.message.text;
      const chat = await ctx.getChat();

      const isAuth = await TgUser.auth(token, chat.id);
      if (isAuth) {
        await ctx.reply(`Токен подтвержден`, authorizedKeyboard);
      } else {
        await ctx.reply(
          "Ви ввели несуществующий токен авторизации. Повторите попытку."
        );
      }
    }
  });
  // --------------

  // bot.use(async (ctx) => {
  //   await ctx.reply("Start", notAuthorizedKeyboard);
  // });

  bot.catch((err) => {
    console.log(err);
  });

  bot.launch();

  // Enable graceful stop
  // process.once("SIGINT", () => bot.stop("SIGINT"));
  // process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
