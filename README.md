# Требования для запуска:

Node.js версии 20+
PostgreSQL версии 15+

Запуск проектов:

git clone https://github.com/AHdr0Hchik/EffectiveMobile

# products-service:

cd products-service

### Создайте базу данных:
```powershell
# Запустите psql
psql -U postgres

# В psql выполните:
CREATE DATABASE effectivemobile_products;
\q
```

Установка зависимостей
npm install

В /src/config/config.json:

```json
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "effectivemobile_products",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "your_username",
    "password": "your_password",
    "database": "effectivemobile_products",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "your_username",
    "password": "your_password",
    "database": "effectivemobile_products",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

Запуск миграций
npm run migrate

Запуск сервиса
npm run start

# history-service:

cd history-service

Создайте базу данных:
```powershell
# Запустите psql
psql -U postgres

# В psql выполните:
CREATE DATABASE effectivemobile_history;
\q
```

Установка зависимостей
npm install

Отредактируйте `.env` файл:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_name
DB_PASSWORD=your_password
DB_NAME=effectivemobile_history
```

Запуск миграций
npm run migrate

Сборка проекта
npm run build

Запуск сервиса
npm run start

# user-service:

cd user-service
 
### Отредактируйте `.env` файл:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_name
DB_PASSWORD=your_password
DB_NAME=effectivemobile_userservice
```

### Вариант 1: Через Docker (рекомендуется)

в случае, если порт 5432 занят, поменяйте его на другой в docker-compose.yml и в .env-файле

```powershell
# Запуск контейнеров
docker-compose up --build

# В новом окне PowerShell выполните миграции
docker-compose exec app npx sequelize-cli db:migrate
```

### Вариант 2: Локальный запуск

1. Создайте базу данных:
```powershell
# Запустите psql
psql -U postgres

# В psql выполните:
CREATE DATABASE effectivemobile_userservice;
\q
```
-
2. Установите зависимости и запустите проект:
```powershell
# Установка зависимостей
npm install

# Запуск миграций
npx sequelize-cli db:migrate

# Запуск проекта
npm run start:dev
```
# Установка зависимостей
npm install

# Запуск миграций
npx sequelize-cli db:migrate

# Запуск проекта
npm run start:dev