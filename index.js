// Подключаем библиотеку dotenv
require("dotenv").config();
// Обращаемся к библиотеке grammy и импортируем из него класс Bot
const { Bot, GrammyError, HttpError, Keyboard } = require("grammy");
const { socials } = require("./utils/links");
const { logger } = require("./utils/logger");
const { createKeyboard } = require("./utils/helper");

// Создаем своего бота на основе импортированного класса, передавая
// в качестве аргумента ссылку на токен из .env файла
const bot = new Bot(process.env.BOT_API_KEY);

//реакция на команду /start
bot.command("start", async (ctx) => {
  const startKeyboard = new Keyboard()
    .text("🙋‍♂️ Задать вопрос")
    .row()
    .text("📲 Социальные сети")
    .row()
    .text("🔍 Поиск по предыдущим ответам")
    .row()
    .resized()
    .oneTime();
  await ctx.react("👍");
  await ctx.reply("Привет! Я - Бот 🤖");
  await ctx.reply("С чего начнем? Выбирай 👇", {
    reply_markup: startKeyboard,
  });
});

bot.hears("Назад ↩️", async (ctx) => {
  const startKeyboard = new Keyboard()
    .text("🙋‍♂️ Задать вопрос")
    .row()
    .text("📲 Социальные сети")
    .row()
    .text("🔍 Поиск по предыдущим ответам")
    .row()
    .resized()
    .oneTime();
  await ctx.reply("Выберите действие:", {
    reply_markup: startKeyboard,
  });
});

function handleButtonClicks(items) {
  items.forEach((item) => {
    bot.hears(item.name, async (ctx) => {
      let message = "";
      message = `Вот ссылка на ${item.name}: ${item.url}`;
      await ctx.reply(message);
    });
  });
}

handleButtonClicks(socials);

bot.hears("📲 Социальные сети", async (ctx) => {
  const socialKeyboard = createKeyboard(socials);
  await ctx.reply("Выберите социальную сеть:", {
    reply_markup: socialKeyboard,
  });
});

bot.hears("🙋‍♂️ Задать вопрос", async (ctx) => {
  await ctx.reply("Сформулируйте свой вопрос");
  await ctx.reply(
    "📎 Вы можете добавить к вопросу ссылку, фото, видео или файл"
  );
});

bot.hears("🔍 Поиск по предыдущим ответам", async (ctx) => {
  await ctx.reply("Введите ключевое слово для поиска по предыдущим ответам");
});

bot.command("menu", async (ctx) => {
  const startKeyboard = new Keyboard()
    .text("🙋‍♂️ Задать вопрос")
    .row()
    .text("📲 Социальные сети")
    .row()
    .text("🔍 Поиск по предыдущим ответам")
    .row()
    .resized()
    .oneTime();
  await ctx.reply("Выберите действие:", {
    reply_markup: startKeyboard,
  });
});

bot.hears([/пипец/, /дрянь/], async (ctx) => {
  await ctx.reply("Не грусти, котик!😽");
});

//реакция на сообщение от юзера
bot.on("message", async (ctx) => {
  await ctx.reply("Надо подумать...");
});

bot.api.setMyCommands([
  { command: "start", description: "Запуск бота" },
  { command: "menu", description: "Выбрать действие" },
]);

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
