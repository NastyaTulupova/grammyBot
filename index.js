// Подключаем библиотеку dotenv
require("dotenv").config();
// Обращаемся к библиотеке grammy и импортируем из него класс Bot
const { Bot, GrammyError, HttpError } = require("grammy");
// Создаем своего бота на основе импортированного класса, передавая
// в качестве аргумента ссылку на токен из .env файла
const bot = new Bot(process.env.BOT_API_KEY);

//реакция на команду /start
bot.command("start", async (ctx) => {
  await ctx.reply("Привет! Я - Бот!🤖");
});

//реакция на сообщение от юзера
bot.on("message", async (ctx) => {
  await ctx.reply("Надо подумать...");
});

//обработчик ошибок
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// Запуск бота
bot.start();
