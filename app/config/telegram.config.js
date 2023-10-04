export default {
  token: "6673876379:AAHBMnmRynznzyJns1tEhSc2SU56XBFQkwM",
  text: {
    buttons: {
      balance: "Баланс",
      deposit: "Пополнение",
      statistics: "Просмотреть статистику",
      authorization: 'Авторизация',
      logout: 'Вийти'
    },
    responses: {
      balance: (value, currency = "$") => `Ваш баланс: ${value}${currency}`,
    },
  },
};
