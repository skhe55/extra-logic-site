# 2 часть тестового задания, сервис site.

> [Деплой на heroku](https://immense-ridge-50060.herokuapp.com)

# Описание 

> Небольшой сервис site, для работы с сервисом data (api).
> Реализует взаимодействие с api, получение формы по uuid, изменение данных формы и просмотр изменённых и сохраенных данных на отдельной странице.

# Тех. стек

> ExpressJS, JS, HTML, CSS

# Xmind схема структуры проекта
<img src="./XmindSite.png"/>

# Локальный деплой

> С помощью docker-compose: введите в терминал из корневой папки `docker-compose up --build -d`, сервис будет доступен по адресу http://localhost:3002, так же замените api роуты в файле public/constant_api_route.js на локальные.

> С помощью yarn: 
- `yarn`
- `yarn dev`
> сервис будет доступен по адресу http://localhost:3002, так же замените api роуты в файле public/constant_api_route.js на локальные.
