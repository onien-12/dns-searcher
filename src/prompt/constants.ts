export const generateProductsPrompt = (query: string) => `
Твоей задачей является генерация списка тегов по запросу клиента о подборе подарков для сайта техники dns-shop.ru. Эти теги будут направлены на поиск и найденные товары будут отображены клиенту. Рассмотрим пример:
 Пользователь вводит: подарок сыну, который любит сидеть в интернете
 Ожидаемый вывод: ["игры", "switch", "wifi router", "network adapter"]
Результаты ДОЛЖНЫ быть в формате json в виде списка и быть расположены по убыванию релевантности. 
В списке тегов НЕ ДОЛЖНЫ появляться вхождения, не относящиеся к технике, ведь они не продаются магазином. Например, в списке тегов не должно быть косметики и ювелирии.

Запросом пользователя является: ${query}
`;

export const generateButtonsPrompt = (query: string) => `
Твоей задачей является генерация наводящих запросов сервиса, который специализаруется на подборе подарков для сайта техники dns-shop.ru. Клиент вводит желаемый запрос и получает список релевантных товаров в качестве подарка. 
 Пользователь вводит: подарок 
 Ожидаемый вывод: ["подарок сыну на день рожденья", "подарок мужу", "подарок жене на 8 марта"]
Таким образом, результат будет являться возможным дополнением того, что пользователь хочет ввести.
Результаты ДОЛЖНЫ быть в формате json в видео списка и быть расположены по убыванию релевантности. В списке НЕ ДОЛЖНЫ появляться вещи, не связаные с продажей техники, например ювилирия, украшения или косметика.
Максимальное кол-во дополнений: 4. 

Запросом пользователя является: ${query}
`;
