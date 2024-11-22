# User Service - Windows Installation Guide

## Требования для Windows

- Node.js (v16+) - [Скачать](https://nodejs.org/)
- PostgreSQL (v13+) - [Скачать](https://www.postgresql.org/download/windows/)
- Docker Desktop для Windows - [Скачать](https://www.docker.com/products/docker-desktop/)
- Git для Windows - [Скачать](https://git-scm.com/download/windows)

## Установка и настройка

### 1. Установка PostgreSQL

1. Скачайте и установите PostgreSQL с официального сайта
2. При установке запомните:
   - Порт (по умолчанию 5432)
   - Пароль для пользователя postgres
3. Добавьте PostgreSQL в PATH Windows:
   - Откройте "Система" → "Дополнительные параметры системы" → "Переменные среды"
   - В "Переменные среды" найдите Path
   - Добавьте путь: `C:\Program Files\PostgreSQL\13\bin` (версия может отличаться)

### 2. Установка Docker Desktop

1. Установите Docker Desktop
2. Убедитесь, что WSL 2 установлен и настроен
3. Запустите Docker Desktop

### 3. Установка проекта

```powershell
# Клонирование репозитория
git clone <repository-url>
cd user-service

# Создание .env файла
copy .env.example .env
```

Отредактируйте `.env` файл:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=user_service
```

## Запуск проекта

### Вариант 1: Через Docker (рекомендуется)

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
CREATE DATABASE user_service;
\q
```

2. Установите зависимости и запустите проект:
```powershell
# Установка зависимостей
npm install

# Запуск миграций
npx sequelize-cli db:migrate

# Запуск проекта
npm run start:dev
```

## Полезные команды для Windows

### Docker команды (PowerShell)

```powershell
# Просмотр запущенных контейнеров
docker-compose ps

# Остановка контейнеров
docker-compose down

# Просмотр логов
docker-compose logs

# Перезапуск контейнеров
docker-compose restart
```

### PostgreSQL команды (PowerShell)

```powershell
# Подключение к базе данных
psql -U postgres -d user_service

# Создание базы данных
createdb -U postgres user_service

# Удаление базы данных
dropdb -U postgres user_service
```

### NPM команды

```powershell
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run start:dev

# Сборка проекта
npm run build
```

## Устранение проблем в Windows

### 1. Проблемы с Docker

**Ошибка**: "Docker Desktop is not running"
```powershell
# Решение:
# 1. Проверьте, что Docker Desktop запущен
# 2. Проверьте статус WSL 2:
wsl --status

# 3. Если нужно, обновите WSL:
wsl --update
```

### 2. Проблемы с PostgreSQL

**Ошибка**: "psql is not recognized as an internal or external command"
```powershell
# Решение: Добавьте PostgreSQL в PATH или используйте полный путь:
"C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres
```

**Ошибка**: "Connection refused"
```powershell
# Проверьте статус службы PostgreSQL
services.msc
# Найдите "PostgreSQL" и убедитесь, что служба запущена
```

### 3. Проблемы с правами доступа

```powershell
# Запустите PowerShell от администратора
Start-Process PowerShell -Verb RunAs
```

### 4. Проблемы с портами

```powershell
# Проверка занятого порта
netstat -ano | findstr :5432

# Завершение процесса по PID
taskkill /PID <PID> /F
```

## Работа с проектом через pgAdmin

1. Откройте pgAdmin (обычно устанавливается вместе с PostgreSQL)
2. Подключитесь к серверу:
   - Host: localhost
   - Port: 5432
   - Username: postgres
   - Password: [ваш пароль]

## Тестирование API

### Использование Postman

1. Установите [Postman](https://www.postman.com/downloads/)
2. Создайте новый запрос:
   - Method: POST
   - URL: http://localhost:3000/users/reset-problems
   - Нажмите Send

### Использование curl в PowerShell

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/users/reset-problems" -Method POST
```

## Рекомендации по разработке в Windows

1. Используйте Visual Studio Code
2. Установите расширения:
   - Docker
   - PostgreSQL
   - Thunder Client (альтернатива Postman)
   - WSL

3. Настройте автоматическое форматирование кода:
```json
// .vscode/settings.json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

## Дополнительно

- Используйте Windows Terminal для более удобной работы с командной строкой
- Рассмотрите использование WSL 2 для разработки
- Настройте антивирус для исключения папки проекта
- Регулярно делайте бэкапы базы данных

При возникновении проблем создавайте issue в репозитории проекта или обращайтесь к документации.