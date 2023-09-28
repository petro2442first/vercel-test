import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";
import config from "../config/telegram.config";

export default () => {
  const bot = new Telegraf(config.token);

  const replyKeyboard = Markup.keyboard([
    [config.text.buttons.balance, config.text.buttons.deposit],
    [config.text.buttons.statistics],
  ]).resize();
  bot.command("quit", async (ctx) => await ctx.leaveChat());

  bot.hears(config.text.buttons.balance, async (ctx) => {
    await ctx.reply(config.text.responses.balance(127));
  });
  bot.on("callback_query", async (ctx) => await ctx.answerCbQuery());

  bot.on("inline_query", async (ctx) => {
    const result = [];
    console.log(ctx);
    await ctx.answerInlineQuery(result);
  });

  bot.use(async (ctx) => {
    await ctx.reply("Start", replyKeyboard);
  });

  bot.launch();

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
