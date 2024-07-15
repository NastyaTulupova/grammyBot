const { Keyboard } = require("grammy");

//создание клавиатуры с кнопками в 2 ряда

function createKeyboard(socials) {
  const keyboard = new Keyboard();
  const buttonCount = socials.length;

  //проверка индекса кнопки через остаток от деления на 2, чтобы сделать перенос строки
  for (let i = 0; i < buttonCount; i++) {
    keyboard.text(socials[i].name);
    if (i % 2 !== 0) {
      keyboard.row();
    }
  }

  keyboard.text("Назад ↩️");
  return keyboard;
}

module.exports = { createKeyboard };
