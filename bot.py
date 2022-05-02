import logging
from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.types.web_app_info import WebAppInfo
from aiogram.types import MenuButton
from app import create_customer, query_news, customer_set_news, get_id

# Объект бота
bot = Bot(token="5388724168:AAGck_2xlwnIr4ZH9GyQLsfwEBDS4NBKL1k", parse_mode=types.ParseMode.HTML)
# Диспетчер для бота
dp = Dispatcher(bot)
# Включаем логирование, чтобы не пропустить важные сообщения
logging.basicConfig(level=logging.INFO)


# Хэндлер на команду /test1
@dp.message_handler(commands="test1")
async def cmd_test1(message: types.Message):
    await message.reply("Test 1")
# Хэндлер на команду /test2
async def cmd_test2(message: types.Message):
    await message.reply("Test 2")

# CHANNEL_ID = '129681560'


@dp.message_handler(commands="inline_url")
async def send_message(message: types.Message):
    query_news()
    channels = query_news()
    reply_text = 'Оставить новости?'
    news_text = 'Вот такие ебать новости, пошел я нахуй тоси боси, хуй на троссе. ПОКА!'
    # for channel in range(len(channels)):
    print('pizdec')
    for nonetype in range(len(channels[0])):
        await bot.send_message(channels[0][nonetype], news_text)
        await bot.send_message(channels[0][nonetype], reply_text, reply_markup=InlineKeyboardMarkup().add(InlineKeyboardButton(text="❎", callback_data="reject_news"), InlineKeyboardButton(text="✅", callback_data="accept_news")))
        customer_set_news(get_id(channels[0][nonetype]), True)

    for truetype in range(len(channels[1])):
        await bot.send_message(channels[1][truetype], news_text)

dp.register_message_handler(send_message, commands="test2")


@dp.message_handler(commands="inline_url")
async def set_none(message: types.Message):
    customer_set_news(5, None)
    customer_set_news(6, None)
    print('Gatova')

dp.register_message_handler(set_none, commands="test3")

@dp.callback_query_handler(text='accept_news')
async def aaa_call(callback: types.CallbackQuery):

    customer_set_news(get_id(callback.from_user.id), True)
    await callback.message.answer('Кайф')
    await callback.message.delete()


@dp.callback_query_handler(text='reject_news')
async def aaa_call(callback: types.CallbackQuery):
    customer_set_news(get_id(callback.from_user.id), False)
    await callback.message.answer('похуй проебали')
    await callback.message.delete()


@dp.message_handler(commands="start")
async def cmd_start(message: types.Message):
    # await message.answer("Let's start!😀", reply_markup=InlineKeyboardMarkup().add(InlineKeyboardButton(text="Order food", web_app = WebAppInfo(url="https://hub.delivery/"))))
    # menu_button = MenuButton()
    print(message.from_user.id)
    # print(menu_button)
    create_customer(message.from_user.id)
    print(message.from_user)


# on_startup(print('pizda'))
executor.start_polling(dp, skip_updates=True)
