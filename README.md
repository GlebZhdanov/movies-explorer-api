# Movies-explorer-api

## Функционал:
- Регистрации и авторизация;
- Изменение информации о пользователе;
- Добавление фильмов;
- Удаление фильмов.

##  Документация к API

- #### `POST /signup`
создаёт пользователя с переданными в теле `email, password и name`

- #### `POST /signin`
проверяет переданные в теле `email и password` и возвращает `JWT` токен

### Защищенные роуты:

- #### `GET /users/me`
возвращает информацию о пользователе, его `email и name` 

- #### `PATCH /users/me`
изменяет информацию о пользователе

- #### `GET /movies`
возвращает все сохранённые фильмы пользователя

- #### `POST /movies`
создаёт фильм с необходимыми полями

- #### `DELETE /movies/Id`
удаляет фильм по `id`

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

### Статус проекта

Проект завершён.
