# Snippets Frontend

Фронтенд‑частина застосунку для роботи зі snippets (короткими записами).  
Можливості: створення, перегляд, пошук, фільтрація за тегами, CRUD‑операції, базова валідація форм, інтеграція з API.

---

## 🚀 Запуск локально

```bash
# 1. Клонувати репозиторій і перейти в нього
git clone https://github.com/Mykhailenko-Oleksandr/arctic-web-test
cd arctic-web-test

# 2. Встановити залежності
npm install

# 3. Запустити dev‑сервер
npm run dev
```

Додаток буде доступний за адресою: http://localhost:3000

## 🔍 Перевірка API

Фронтенд працює з бекенд‑ендпоінтами. Для тестування можна використати curl або Postman.

### Отримати всі snippets

Postman/curl http://localhost:3000/api/snippets

### Створити snippet

Postman/curl -X POST http://localhost:3000/api/snippets \
 -H "Content-Type: application/json" \
 -d '{
"title": "Мій перший snippet",
"content": "Це тестовий запис",
"tag": ["Work"],
"type": "Note"
}'

## 📦 Білд та запуск у продакшн‑режимі

# Зібрати застосунок

npm run build

# Запустити у продакшн‑режимі

npm run start

За замовчуванням застосунок працює на порту 3000.

## 🌐 Тестовий деплой

Демо‑версія доступна за посиланням:

Vercel: ([your-vercel-deploy.vercel.app](https://arctic-web-test.vercel.app/))
