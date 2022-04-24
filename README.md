# Movies-explorer-api

## Функционал:
- Регистрации и авторизация;
- Изменение информации о пользователе;
- Добавление фильмов;
- Удаление фильмов.

##  Документация к API

#### `POST /users/signup`
создаёт пользователя с переданными в теле `email, password и name`

#### `POST /users/signin`
проверяет переданные в теле `email и password` и возвращает `JWT` токен

### Защищенные роуты

#### `GET /users/me`
возвращает информацию о пользователе, его `email и name` 

#### `GET /articles`
возвращает все сохранённые пользователем статьи

#### `POST /articles`
создаёт статью с переданными в теле `keyword, title, text, date, source, link и image`

#### `DELETE /articles/articleId`
удаляет сохранённую статью по `id`

##  Стек

- Javascript
- Node
- Express
- MongoDB

## Для запуска проекта

##### `npm install` – установить зависимости проекта

##### `npm run start` – запуск сервера на http://localhost:3000/

##### `npm run dev` – запуск сервера с hot reload на http://localhost:3000/

### **Ссылка на готовый бекенд: [Movies-explorer-api](https://api.films.gleb.nomoredomains.work)**
